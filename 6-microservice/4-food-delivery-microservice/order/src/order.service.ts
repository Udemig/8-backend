import type { OrderInput } from "./order.dto.js";
import Order from "./order.model.js";
import rabbitmqService from "./rabbitmq.service.js";
import { AppError } from "./utils/app-error.js";

//* Order Service - Business Logic
class OrderService {
  async createOrder(body: OrderInput, userId: string) {
    // veritabanına siparişi kaydet
    const newOrder = await Order.create({ ...body, userId });

    // sipariş oluşturulduğunda delivery servisine haber gönder
    // routing key "order.created" -> "order.*" pattern'i mesajı delivery kuyruğuna iletir
    await rabbitmqService.publishMessage("order.created", newOrder);

    // yeni siparişi döndür
    return newOrder;
  }

  async getUserOrders(userId: string) {
    // veritabanından kullanıcının siparişlerini al
    const orders = await Order.find({ userId });

    // sipariş yoksa hata ver
    if (!orders || orders.length === 0) throw new AppError("Sipariş bulunamadı", 404);

    // siparişleri döndür
    return orders;
  }
}

export default new OrderService();
