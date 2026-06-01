import amqp, { type Channel, type ChannelModel } from "amqplib";

/*
 * RabbitMQ Service
 */

class RabbitMQService {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;
  private readonly exchangeName = "food_delivery_exchange";
  private isShuttingDown = false;

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
}

export default new RabbitMQService();
