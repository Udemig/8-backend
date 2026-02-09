import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { Unauthorized, Forbidden } from "../utils/errors.js";
import catchAsync from "../utils/catchAsync.js";
import dotenv from "dotenv";
dotenv.config();

// -------- Authorization Middleware ---------
// * Client'ın gönderdiği token'ın geçerliğini doğruylayıp:
// * Token geçersiz ise route'a erişimine izin vermeyip hata fırlat
// * Token geçerliyse route'a erişmesine izin ver

export const protect = catchAsync(async (req, res, next) => {
  // 1) çerez veya header ile gelen tokeni al
  let token = req.cookies.jwt || req.headers.authorization; // oturumu kapalıysa: undefined | açıksa: eyJhbGciOiJIUzI1NiIsInR5cCI...

  // 1.2) token header olarak geldiyse bearer kelimesinden sonrasını al
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }

  // 1.3) token gelmediyse hata fırlat
  if (!token) throw new Unauthorized();

  // 2) token'ın geçerliliğini doğrula (zaman aşımına uğradımı | imza doğru mu)
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Unauthorized();
  }

  // 3) token'ın ile gelen kullanıcnın hesabı duruyor mu
  let activeUser;
  try {
    activeUser = await User.findById(decoded.id);
  } catch (error) {
    throw new Unauthorized();
  }

  // 3.1) hesap silindiyse / mevcut değilse hata fırlat
  if (!activeUser) throw new Unauthorized();

  // 3.2) hesap dondurulduysa hata fırlat
  if (!activeUser.active) throw new Unauthorized();

  //todo: kullanıcıya tokenı verdikten sonra şifresini sıfırlamış mı

  // bu mw'den sonra çalışıcak fonksiyonların kullanıcı bilgisine erişmesi için req nesnesine ekle
  req.user = activeUser;

  // sonraki adıma geç
  next();
});

// ------ Rol Kontrolü Yapıcak Middleware -------
// * İstek atan kullanıcnın rolü fonksiyonun parametre olarak aldığı rollerden biriyse:
// * erişime izin ver
// * değilse erişimi engelle
export const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    // Kullanıcın rolü izin verilen roller arasında mı?
    const hasPermission = allowedRoles.includes(req.user?.role);

    // Kullanıcının rolü yeterli değilse hata frlat
    if (!hasPermission) {
      next(new Forbidden());
    }

    // Rolü yeterliyse devam et
    next();
  };
