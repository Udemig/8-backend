import deliveryService from "./delivery.service.js";
import catchAsync from "./utils/catch-async.js";

class DeliveryController {
  x = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  y = catchAsync(async (req, res, next) => {});

  z = catchAsync(async (req, res, next) => {});
}

export default new DeliveryController();
