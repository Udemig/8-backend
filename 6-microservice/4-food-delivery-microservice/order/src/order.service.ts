import type { OrderInput } from "./order.dto.js";
import Order from "./order.model.js";
import rabbitmqService from "./rabbitmq.service.js";
import type { OrderStatus } from "./types/index.js";
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

  async getOrderById(id: string) {
    const order = await Order.findById(id);

    if (!order) throw new AppError("Sipariş bulunamadı", 404);

    return order;
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    // veritabanında siparişi güncelle
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    // sipariş bulunamazsa hata
    if (!order) throw new AppError("Sipariş bulunamadı", 404);

    // sipariş güncellemesini delivery servise haber gönder
    await rabbitmqService.publishMessage("order.updated", order);

    return order;
  }
}

export default new OrderService();
