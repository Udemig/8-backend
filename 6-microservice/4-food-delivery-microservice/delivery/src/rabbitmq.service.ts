import amqp, { type Channel, type ChannelModel } from "amqplib";
import { AppError } from "./utils/app-error.js";
import type { IOrder, IUser } from "./types/index.js";
import { Courier, Delivery } from "./delivery.model.js";

/*
 * RabbitMQ Service
 */

class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName = "food_delivery_exchange";
  private isShuttingDown = false;

  //* Mesaj kuyrukları
  private readonly deliveryQueue = "delivery_queue";
  private readonly courierQueue = "courier_queue";

  //* Kurulum
  async initialize() {
    const url = process.env.RABBITMQ_URI;

    try {
      // rabbitmq'ya bağlan
      this.connection = await amqp.connect(url!);

      // hata olursa
      this.connection.on("error", (err) => {
        console.error("❌ RabbitMQ bağlantı hatası:", err.message);
      });

      // bağlantı kapanırsa
      this.connection.on("close", (err) => {
        console.warn("⚠️ RabbitMQ bağlantısı kapandı");
      });

      // iletişim kanalı oluştur
      this.channel = await this.connection.createChannel();

      // mesajları kuyruklara yönlendirecek exchange elemanı
      await this.channel.assertExchange(this.exchangeName, "topic", { durable: true });

      // kuyrukları tanımla
      await this.channel.assertQueue(this.deliveryQueue, { durable: true });
      await this.channel.assertQueue(this.courierQueue, { durable: true });

      // bindingleri tanımla
      await this.channel.bindQueue(this.deliveryQueue, this.exchangeName, "order.*");
      await this.channel.bindQueue(this.courierQueue, this.exchangeName, "courier.*");

      // consumer'ları başlat
      await this.consumeCourierMessages();
      await this.consumeDeliveryMessages();

      console.log("✅ RabbitMQ'ya bağlandı");
    } catch (error) {
      console.log("❌ RabbitMQ initialize hatası", error);
    }
  }

  //* Kanalı kapat
  async close(): Promise<void> {
    this.isShuttingDown = true;

    try {
      await this.channel?.close();
      await this.connection?.close();
      console.log("RabbitMQ bağlantısı düzgünce kapatıldı");
    } catch (error) {
      console.log("Shutdown sırasında hata:", error);
    }
  }

  //* Mesajı yayınla
  async publishMessage(routingKey: string, rawMessage: unknown): Promise<void> {
    // ileştişim kanalı açık mı kontrol et
    if (!this.channel) throw new Error("RabbitMQ kanalı mevcut değil");

    // mesajı buffer formatına çevir
    const message = Buffer.from(JSON.stringify(rawMessage));

    // kanala mesajı gönder
    this.channel.publish(this.exchangeName, routingKey, message, {
      persistent: true,
      contentType: "application/json",
      messageId: crypto.randomUUID(),
      timestamp: Date.now(),
    });

    console.log(`📤 [${routingKey}] mesaj yayımlandı`);
  }

  //* Yeni kurye kayıtlarını dinle
  //* Auth service "courier.created" yayınlar, biz bu mesajı alınca kuryeyi veritabanına kaydetmeliyiz
  async consumeCourierMessages(): Promise<void> {
    if (!this.channel) throw new AppError("RabbitMq kanalı oluşturulamadı");

    await this.channel.consume(this.courierQueue, async (message) => {
      if (!message) return;

      try {
        // mesajın içerisindeki veriye eriş
        const userData = JSON.parse(message.content.toString()) as IUser;

        // kuryeyi veritabanına kaydet
        await Courier.findByIdAndUpdate(
          userData.id,
          {
            $setOnInsert: {
              _id: userData.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              status: "available",
            },
          },
          { upsert: true, new: true },
        );

        // mesajı aldığımızı rabbitmq'ya haber ver
        console.log("Kurye kaydedildi: ", userData.email);
        this.channel?.ack(message);
      } catch (error) {
        // mesajı alamadığımızı rabbitmq'ya haber ver
        console.error("Courier consume hatası:", error);
        this.channel?.nack(message, false, false);
      }
    });
  }

  //* Sipariş olaylarını dinle
  //* - order.created (status:pending) -> Delivery kaydı aç + kurye ata
  //* - order.ready                    -> Delivery'i "ready" yap
  async consumeDeliveryMessages(): Promise<void> {
    if (!this.channel) throw new AppError("RabbitMQ kanalı oluşturulmamaış");

    await this.channel.consume(this.deliveryQueue, async (message) => {
      if (!message) return;

      try {
        // gelen mesaja eriş
        const deliveryMessage = JSON.parse(message.content.toString()) as IOrder;

        // sipariş geldiyse delivery kaydını oluştur
        if (deliveryMessage.status === "pending") {
          const delivery = await Delivery.findOneAndUpdate(
            { orderId: deliveryMessage.id },
            { $setOnInsert: { courierId: null, status: "pending" } },
            { upsert: true, new: true },
          );

          // en uzun süredir müsait olarak bekleyen kuryeyi meşgul'e çek
          const courier = await Courier.findOneAndUpdate(
            { status: "available" },
            { status: "busy" },
            { sort: { updatedAt: 1 }, new: true },
          );

          // siparişi kuryeye ata
          if (courier) {
            await Delivery.findByIdAndUpdate(delivery.id, {
              status: "assigned",
              courierId: courier.id,
              acceptedAt: new Date(),
            });
            console.log(`Sipariş ${deliveryMessage.id} -> kurye ${courier.email}`);
          } else {
            console.log(`Müsait kurye yok, sipariş ${deliveryMessage.id} bekliyor`);
          }
        }

        // sipariş iptal edildiyse
        if (deliveryMessage.status === "cancelled") {
          const updatedDelivery = await Delivery.findOneAndUpdate(
            { orderId: deliveryMessage.id, courierId: null, acceptedAt: null },
            { status: "cancelled" },
            { new: true },
          );

          if (updatedDelivery?.courierId) {
            await Courier.findByIdAndUpdate(updatedDelivery.courierId, { status: "available" });
          }

          console.log(`Sipariş ${deliveryMessage.id} iptal edildi`);
        }

        // sipariş status değiştiyse delivery kaydını güncelle
        if (deliveryMessage.status !== "pending" && deliveryMessage.status !== "cancelled") {
          await Delivery.findOneAndUpdate({ orderId: deliveryMessage.id }, { status: deliveryMessage.status });
          console.log(`Sipariş ${deliveryMessage.id} güncellendi`);
        }

        this.channel?.ack(message);
      } catch (error) {
        console.log("Delivery consume hatası", error);
        this.channel?.nack(message);
      }
    });
  }
}

export default new RabbitMQService();
