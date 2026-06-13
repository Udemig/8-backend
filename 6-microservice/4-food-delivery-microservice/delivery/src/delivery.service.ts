import type { DeliveryUpdateInput } from "./delivery.dto.js";
import { Courier, Delivery } from "./delivery.model.js";
import { AppError } from "./utils/app-error.js";

//* Delivery Service - Business Logic
class DeliveryService {
  async getAvailableDeliveries() {
    return await Delivery.find({
      status: { $in: ["pending", "ready", "preparing"] },
      courierId: null,
    });
  }

  async acceptDelivery(orderId: string, courierId: string) {
    // kurye müsait mi kontrol et + busy yap
    const courier = await Courier.findOneAndUpdate(
      { _id: courierId, status: "available" },
      { status: "busy" },
      { new: true },
    );

    // kurye müsait edğilse hata:
    if (!courier) {
      throw new AppError("Kurye müsait değil", 409);
    }

    // teslimatı kuryeye ata
    const delivery = await Delivery.findOneAndUpdate(
      { orderId, courierId: null },
      { courierId, status: "assigned", acceptedAt: new Date() },
      { new: true },
    );

    // teslimat zaten başka kuryeye atanmışsa hata:
    if (!delivery) {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });
      throw new AppError("Bu sipariş zaten başka bir kuryeye atanmış", 409);
    }

    return delivery;
  }

  // todo
  async updateDelivery(orderId: string, courierId: string, deliveryData: DeliveryUpdateInput) {}
}

export default new DeliveryService();
