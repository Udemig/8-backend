import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import { NotFound } from "../utils/errors.js";
import APIFeatures from "../utils/apiFeatures.js";

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviewFeatures = new APIFeatures(Review.find(), req.query).pagination().sort();
  const reviews = await reviewFeatures.query;

  res.status(200).json({ message: "Yorumlar Listelendi", data: reviews });
});

export const getOneReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const review = await Review.findById(id);

  if (!review) {
    throw new NotFound("Aradığınız yorum bulunamadı");
  }

  res.status(200).json({ message: "Aradığınız yorum bulundu", data: review });
});

export const createReview = catchAsync(async (req, res, next) => {
  // yorum hangi tura atıldı
  const tour = req.body.tour;
  // yorumun rating değeri
  const rating = req.body.rating;
  // yorumun açıklamassı
  const review = req.body.review;
  // yorumu atan kullanıcı
  const user = req.user._id;

  // yeni yorumu veritabanına kaydet
  const newReview = await Review.create({ review, rating, tour, user });

  // client'a cevap gönder
  res.status(201).json({ message: "Yorum atıldı", data: newReview });
});

export const updateReview = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "İşlem başarılı" });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "İşlem başarılı" });
});
