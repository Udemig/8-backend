import catchAsync from "../utils/catchAsync.js";
import Review from "../models/reviewModel.js";
import { NotFound } from "../utils/errors.js";

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

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
  res.status(200).json({ message: "İşlem başarılı" });
});

export const updateReview = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "İşlem başarılı" });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "İşlem başarılı" });
});
