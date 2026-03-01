import Tour from "../models/tourModel.js";
import catchAsync from "../utils/catchAsync.js";
import { BadRequest } from "../utils/errors.js";
import * as factory from "../utils/handlerFactory.js";

export const getAllTours = factory.getAll(Tour);

export const getOneTour = factory.getOne(Tour, [
  { path: "guides", select: "name photo  role -_id" },
  { path: "reviews", select: "-tour" },
]);

export const createTour = factory.createOne(Tour);

export const updateTour = factory.updateOne(Tour);

export const deleteTour = factory.deleteOne(Tour);

// admin paneli için istatistik hesaplayan fn
export const getTourStats = catchAsync(async (req, res) => {
  // Aggregation Pipeline
  // Raporlama Adımları
  const stats = await Tour.aggregate([
    // 1.Adım) ratingi 4 ve üzeri olan turları al
    { $match: { ratingsAverage: { $gte: 4 } } },
    // 2.Adım) zorluğa göre gruplandır ve ortalama değerlerini hesapla
    {
      $group: {
        _id: "$difficulty",
        count: { $sum: 1 },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    // 3.Adım) gruplanan veriyi zorluk isimlerine göre sırala
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json({ message: "Rapor oluşturuldu", stats });
});

// bir yıl için aylık planı raporlayan fn
export const getMonthlyPlan = catchAsync(async (req, res) => {
  // parametre olarak gelen yıla eriş
  const year = req.params.year;

  // istatistik hesaplama
  const stats = await Tour.aggregate([
    {
      $unwind: {
        path: "$startDates",
      },
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: "$startDates",
        },
        count: {
          $sum: 1,
        },
        tours: {
          $push: "$name",
        },
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);

  res.status(200).json({ message: "Rapor oluşturuldu", data: stats });
});

// coğrafi filtreleme
export const getToursWithin = catchAsync(async (req, res) => {
  // parametrelere eriş
  const { distance, latlng, unit } = req.params;

  // enlem / boylam değerini dizi formatına çevir
  const [lat, lng] = latlng.split(",");

  // enlem / boylam verisi sağlnamzsa hata fırlat
  if (!lat || !lng) throw BadRequest("Lütfen merkez noktasını tanımlayın");

  // daire'nin yarıçapına radyan cinsinden hesapla
  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  // berilenen dairesel alandaki turları al
  const tours = await Tour.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [[lat, lng], radius],
      },
    },
  });

  res.status(200).json({
    message: "Sınırlar içerisindeki turlar alındı",
    results: tours.length,
    tours,
  });
});

// uzaklık hesaplama
export const getDistances = catchAsync(async (req, res) => {
  // url'den parametreleri al
  const { latlng, unit } = req.params;

  // enlem/boylam'ı dizi formatına çevir
  const [lat, lng] = latlng.split(",");

  // enlem/boylam gelmediyse hata fırlat
  if (!lat || !lng) throw new BadRequest("Kullanıcı kordinatları sağlanmadı");

  // turların merkez noktasından uzaklıklarını hesapla
  const tours = await Tour.aggregate([
    // 1) uzaklığı hesapla
    {
      $geoNear: {
        near: { type: "Point", coordinates: [+lat, +lng] },
        distanceField: "distance",
        distanceMultiplier: unit === "mi" ? 0.000621371 : 0.001,
      },
    }, // nesneden istediğimiz değerleri seç
    {
      $project: {
        name: 1,
        distance: 1,
      },
    },
  ]);

  // client'a cevap gönder
  res.status(200).json({
    message: "Uzaklıklar hesaplandı",
    tours,
  });
});
