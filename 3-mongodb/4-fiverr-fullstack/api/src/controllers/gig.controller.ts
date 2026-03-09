import catchAsync from "../utils/catch-async.js";
import type { NextFunction, Request, Response } from "express";
import { Forbidden, NotFound } from "../utils/errors.js";
import uploadToCloud from "../utils/upload-to-cloud.js";
import type { Filters, ImageFiles, Query } from "../types/index.js";
import { Gig } from "../models/gig.model.js";

const buildFilters = (query: Query): Filters => {
  const filters: Filters = {};

  if (query.category) filters.category = query.category;

  if (query.userId) filters.user = query.userId;

  if (query.min || query.max) {
    filters.packagePrice = {};

    if (query.min) filters.packagePrice.$gte = Number(query.min);
    if (query.max) filters.packagePrice.$lte = Number(query.max);
  }

  if (query.search) filters.title = { $regex: query.search, $options: "i" };

  return filters;
};

export const getAllGigs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filters = buildFilters(req.query);

  const gigs = await Gig.find(filters).populate("user");

  res.status(200).json({ message: "Hizmetler listlendi", results: gigs.length, data: gigs });
});

export const createGig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // isteği atan kullanıcı satıcı hesabı değilse hata döndür
  if (!req.user.isSeller) return next(new Forbidden());

  // dosyların tipini tanımla
  const files = req.files as unknown as ImageFiles;

  // kapak fotoğrafını cloudinary'e yükle
  const coverImage = await uploadToCloud(next, files.coverImage[0]!.path, "8-gig", 900, 600, "image");

  // diğer fotoğrafları cloudinary'e yüklemek için istekleri oluştur
  const promises = files.images.map((image) => uploadToCloud(next, image.path, "8-gig", 900, 600, "image"));

  // oluşturulan sorguları aynanda çalışğtır
  const images = await Promise.all(promises);

  // cloud'a yüklenen resimlerin url'lerini body'e ekle
  req.body.coverImage = coverImage.secure_url;
  req.body.images = images.map((image) => image.secure_url);

  // özellikler metnini diziye çevir
  req.body.packageFeatures = req.body.packageFeatures.split(",");

  // yeni hizmet belgesi oluştur
  const savedGig = await Gig.create({ ...req.body, user: req.user._id });

  // client'a cevap gönder
  res.status(201).json({ message: "Hizmet başarıyla oluşturuldu", data: savedGig });
});

export const getOneGig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const gig = await Gig.findById(req.params.id).populate("user");

  if (!gig) return next(new NotFound());

  res.status(200).json({ message: "Hizmet verisi bulundu", data: gig });
});

export const deleteGig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // hizmet versisini bul
  const gig = await Gig.findById(req.params.id);

  // bulamazsak hata fırlat
  if (!gig) return next(new NotFound());

  // silmek isteyen kişi ile hizmeti oluşturan kişi aynı mı
  if (String(gig.user) !== String(req.user._id)) return next(new Forbidden());

  // hizmeti sil
  await Gig.findByIdAndDelete(req.params.id);

  // client'a cevap gönder
  res.status(204).json({ message: "Hizmet kaldırıldı" });
});
