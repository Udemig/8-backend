import { orderSchema, validateDTO } from "./order.dto.js";
import orderService from "./order.service.js";
import catchAsync from "./utils/catch-async.js";

class OrderController {
  createOrder = catchAsync(async (req, res, next) => {
    // body verisinin validasyonunu yap
    const body = await validateDTO(orderSchema, req.body);
    const userId = req.user!.userId;

    // servis fonksiyonunu çağır
    const result = await orderService.createOrder(body, userId);

    // client'a cevap gönder
    res.status(201).json({
      status: "success",
      message: "Sipariş oluşturuldu",
      data: result,
    });
  });

  getUserOrders = catchAsync(async (req, res, next) => {
    // parametreye eriş
    const userId = req.params.userId as string;

    // servis fonksiyonunu çağır
    const result = await orderService.getUserOrders(userId);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Kullanıcı siparişleri",
      data: result,
    });
  });

  // TODO
  getOrderById = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  updateOrderStatus = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });
}

export default new OrderController();
