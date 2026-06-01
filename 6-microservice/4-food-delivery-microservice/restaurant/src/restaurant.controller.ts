import { createRestaurantSchema, validateDTO } from "./restaurant.dto.js";
import restaurantService from "./restaurant.service.js";
import catchAsync from "./utils/catch-async.js";

class RestaurantController {
  createRestaurant = catchAsync(async (req, res, next) => {
    // client'dan gelen veriyi kontrol et
    const body = await validateDTO(createRestaurantSchema, req.body);

    // todo: servis işlemlerini yap

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  getAllRestaurants = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  getRestaurantById = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  getRestaurantMenu = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  createMenuItem = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  deleteMenuItem = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });

  updateMenuItem = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "İşlem başarıyla tamamlandı",
      data: null,
    });
  });
}

export default new RestaurantController();
