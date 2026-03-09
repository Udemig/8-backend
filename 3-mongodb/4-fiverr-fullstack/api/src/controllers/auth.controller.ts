import type { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catch-async.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import uploadToCloud from "../utils/upload-to-cloud.js";
import { Unauthorized } from "../utils/errors.js";
import jwt from "jsonwebtoken";
import { config, isProduction } from "../config/enviroment.js";

//* kayıt ol
const register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // şifreyi saltla hashle
  const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

  // yüklenen fotoğrafa eriş
  const image = await uploadToCloud(next, req.file!.path, "8-avatars", 200, 200, "image");

  // kullanıcıyı veritabanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
    profilePicture: image.secure_url,
  });

  // client'a cevap gönder
  res.json({ message: "Hesabınız oluşturuldu", user: newUser });
});

//* giriş yap
const login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // ismine göre kullanıcyı ara
  const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

  // kullanıcı bulunamazsa
  if (!user) return next(new Unauthorized("Giriş bilgileri hatalı"));

  // veritabanındaki hash ile body bölğmğndeki şifreyi karşılaştır
  const isPassCorrect = bcrypt.compareSync(req.body.password, user.password);

  // şifre yanlış ise
  if (!isPassCorrect) return next(new Unauthorized("Giriş bilgileri hatalı"));

  // jwt tokeni oluştur
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES,
  });

  // client'a cevap gönder
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .json({ message: "Oturum açıldı", user });
});

//* çıkış yap
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // client'a cevap gönder
  res.clearCookie("token").status(200).json({ message: "Oturum kapatıldı" });
});

//* profili getir
const profile = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.user);
  // client'a cevap gönder
  res.json({ message: "Profil alındı", user: req.user });
});

export { register, login, logout, profile };
