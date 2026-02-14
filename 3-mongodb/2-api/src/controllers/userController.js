import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { BadRequest } from "../utils/errors.js";

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) şifreyi güncelleme çalışırsa hata ver
  if (req.body.password || req.body.passwordConfirm) throw new BadRequest("Şifreyi bu yöntemle güncellemeyemezsiniz");

  // 2) kullanıcı bilgilerini güncelle
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

  // client'a cevap gönder
  res.status(200).json({ message: "Hesap bilgileri güncellendi", data: updatedUser });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  // 1) hesabı inaktif moda çek
  await User.findByIdAndUpdate(req.user._id, { active: false });

  // client'a cevap gönder
  res.status(200).json({ message: "Hesap kaldırıldı" });
});

export const getMe = catchAsync(async (req, res, next) => {
  return res.status(200).json({ message: "Profil bilgileri alındı", data: req.user });
});

// admin endpointleri
export const getAllUsers = catchAsync(async (req, res, next) => {});

export const getUser = catchAsync(async (req, res, next) => {});

export const createUser = catchAsync(async (req, res, next) => {});

export const updateUser = catchAsync(async (req, res, next) => {});

export const deleteUser = catchAsync(async (req, res, next) => {});
