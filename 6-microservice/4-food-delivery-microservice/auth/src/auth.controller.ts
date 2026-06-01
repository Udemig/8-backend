import { loginSchema, registerSchema, validateDTO, type RegisterInput } from "./auth.dto.js";
import authService from "./auth.service.js";
import catchAsync from "./utils/catch-async.js";

class AuthController {
  register = catchAsync(async (req, res, next) => {
    // client'dan gelen verinin doğru formatta olduğunu kontrol et
    const body: RegisterInput = await validateDTO(registerSchema, req.body);

    // servis methodunu çalıştır
    const result = await authService.register(body);

    // cookie'leri oluştur
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Kullanıcı başarıyla oluşturuldu",
      data: result,
    });
  });

  login = catchAsync(async (req, res, next) => {
    // client'dan gelen veriyi kontrol et
    const body = await validateDTO(loginSchema, req.body);

    // servis methodunu çağırlaım
    const result = await authService.login(body);

    // cookie oluştur
    res.cookie("token", result.token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // client'a cevap gönder
    res.status(200).json({
      status: "success",
      message: "Kullanıcı hesabına giriş yapıldı",
      data: result,
    });
  });

  logout = catchAsync(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "Hesabınızdan çıkış yapıldı",
    });
  });

  profile = catchAsync(async (req, res, next) => {
    res.status(200).json({
      status: "success",
      message: "Kullanıcı profil bilgileri",
      data: req.user,
    });
  });
}

export default new AuthController();
