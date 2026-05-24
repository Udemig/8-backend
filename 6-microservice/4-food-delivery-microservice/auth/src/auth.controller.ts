import authService from "./auth.service.js";
import catchAsync from "./utils/catch-async.js";

class AuthController {
  register = catchAsync(async (req, res, next) => {
    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Kullanıcı başarıyla oluşturuldu",
      data: null,
    });
  });

  login = catchAsync(async (req, res, next) => {});

  logout = catchAsync(async (req, res, next) => {});

  profile = catchAsync(async (req, res, next) => {});
}

export default new AuthController();
