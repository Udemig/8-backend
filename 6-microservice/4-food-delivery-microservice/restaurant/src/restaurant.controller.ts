import {
  createMenuItemSchema,
  createRestaurantSchema,
  queryParamsSchema,
  updateMenuItemSchema,
  validateDTO,
} from "./restaurant.dto.js";
import restaurantService from "./restaurant.service.js";
import catchAsync from "./utils/catch-async.js";

class RestaurantController {
  createRestaurant = catchAsync(async (req, res, next) => {
    // client'dan gelen veriyi kontrol et
    const body = await validateDTO(createRestaurantSchema, req.body);

    // servis işlemlerini yap
    const result = await restaurantService.createRestaurant(body, req.user!.userId);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Restoran oluşturuldu",
      data: result,
    });
  });

  getAllRestaurants = catchAsync(async (req, res, next) => {
    // arama parametrelerini kontrol et
    const queryParams = await validateDTO(queryParamsSchema, req.query);

    // servis ile iletişime geç
    const result = await restaurantService.getAllRestaurants(queryParams);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Restoranlar listelendi",
      data: result,
    });
  });

  getRestaurantById = catchAsync(async (req, res, next) => {
    // parametre olarak elen id'yi al
    const id = req.params.id as string;

    // servis fonksiyonu çağır
    const result = await restaurantService.getRestaurantById(id);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Restoran bulundu",
      data: result,
    });
  });

  createMenuItem = catchAsync(async (req, res, next) => {
    // body verisi geçerli mi kontrol et
    const body = await validateDTO(createMenuItemSchema, req.body);
    const restaurantId = req.params.id as string;

    // servis fonksiyonunu çağır
    const result = await restaurantService.createMenuItem(body, restaurantId);

    // client'a cevap gönder
    res.status(201).json({
      status: "success",
      message: "Ürün menüye eklendi",
      data: result,
    });
  });

  updateMenuItem = catchAsync(async (req, res, next) => {
    // body verisi geçerli mi kontrol et
    const body = await validateDTO(updateMenuItemSchema, req.body);
    const restaurantId = req.params.id as string;
    const itemId = req.params.itemId as string;

    // servis methodunu çağır
    const result = await restaurantService.updateMenuItem(restaurantId, itemId, body);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Ürün güncellendi",
      data: result,
    });
  });

  deleteMenuItem = catchAsync(async (req, res, next) => {
    // parametreleri al
    const restaurantId = req.params.id as string;
    const itemId = req.params.itemId as string;

    // servis fonksiyonunu çağır
    const result = await restaurantService.deleteMenuItem(restaurantId, itemId);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Ürün kaldırıldı",
      data: result,
    });
  });

  getRestaurantMenu = catchAsync(async (req, res, next) => {
    // parametreleri al
    const restaurantId = req.params.id as string;
    const category = req.query.category as string | undefined;

    // servis fonksiyonunu çağır
    const result = await restaurantService.getRestaurantMenu(restaurantId, category);

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Restoran menüsü",
      data: result,
    });
  });
}

export default new RestaurantController();
