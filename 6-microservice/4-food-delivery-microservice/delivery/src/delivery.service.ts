import type { CourierStatusInput, DeliveryUpdateInput } from "./delivery.dto.js";
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
    const courier = await Courier.findOneAndUpdate({ _id: courierId, status: "available" }, { status: "busy" }, { new: true });

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

  async updateDelivery(orderId: string, courierId: string, deliveryData: DeliveryUpdateInput) {
    // teslimat veritabanına kayıtlı mı
    const delivery = await Delivery.findOne({ orderId });

    // teslimat bulunamadıysa:
    if (!delivery) throw new AppError("Sipariş bulunamadı", 404);

    // istek atan kurye teslimattaki kurye ile aynı kişi değilse:
    if (delivery.courierId !== courierId) throw new AppError("Bu siparişi güncellemek içimn yetkiniz yok", 403);

    // kurye siparişi alıp yola çıktıysa (status,location) güncelle
    if (deliveryData.status === "on_the_way") {
      return await Delivery.findOneAndUpdate({ orderId }, { status: "on_the_way", location: deliveryData.location }, { new: true });
    }

    // kurye teslimatı tamamladıysa
    if (deliveryData.status === "delivered") {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });
      return await Delivery.findOneAndUpdate({ orderId }, { status: "delivered", actualDeliveryTime: new Date() }, { new: true });
    }

    // kurye siparişi iptal ettiyse (status,notes) güncelle ve kuryeyi boşa çıkar
    if (deliveryData.status === "cancelled") {
      await Courier.findByIdAndUpdate(courierId, { status: "available" });
      return await Delivery.findOneAndUpdate(
        { orderId },
        { status: "cancelled", courierId: null, acceptedAt: null, notes: deliveryData.notes },
        { new: true },
      );
    }
  }

  async trackDelivery(orderId: string) {
    const delivery = await Delivery.findOne({ orderId });

    if (!delivery) {
      throw new AppError("Sipariş bulunamadı", 404);
    }

    return delivery;
  }

  async updateCourierStatus(courierId: string, body: CourierStatusInput) {
    // Kurye kendini OFFLINE yapmak istiyorsa aktif teslimatı var mı kontrol et
    // Atanamış (assigned) yada yolda (on_the_way) teslimatı varsa engelle
    if (body.status === "offline") {
      const activeDelivery = await Delivery.findOne({ courierId, status: { $in: ["assigned", "on_the_way"] } });

      if (activeDelivery) throw new AppError("Aktif teslimatınız varken offline moduna geçemezsiniz", 409);
    }

    // kurye verisini güncelle
    const courier = await Courier.findByIdAndUpdate(courierId, { status: body.status }, { new: true });

    // kurye bulunamazsa hata gönder
    if (!courier) throw new AppError("Kurye bulunamadı", 404);

    return courier;
  }
}

export default new DeliveryService();
