import type { Request, Response, NextFunction } from "express";
import { BadRequest } from "../utils/errors.js";
import catchAsync from "../utils/catch-async.js";

//* kayıt ol
const register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // client'a cevap gönder
  res.json({ message: "İşlem başarılı" });
});

//* giriş yap
const login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // client'a cevap gönder
  res.json({ message: "İşlem başarılı" });
});

//* çıkış yap
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // client'a cevap gönder
  res.json({ message: "İşlem başarılı" });
});

//* profili getir
const profile = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // client'a cevap gönder
  res.json({ message: "İşlem başarılı" });
});

export { register, login, logout, profile };
