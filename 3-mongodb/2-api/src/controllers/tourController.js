import Tour from "../models/tourModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import { NotFound } from "../utils/errors.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllTours = catchAsync(async (req, res) => {
  // sorgular için kullanıcağımız filtreleme sıralama vb desteklere sahip sınıfı kullanalım
  const features = new APIFeatures(Tour.find(), req.query, req.formattedQuery).filter().sort().select().pagination();

  // sorguyu çalıştır
  const tours = await features.query;

  // client'a yanıt gönder
  res.json({ message: "Tur verisi listendi", results: tours.length, data: tours });
});

export const getOneTour = catchAsync(async (req, res) => {
  // istek ile birlikte gönderilen id parametresine eriş
  const id = req.params.id;

  // veritabanından id'si bilinen turu al
  // const tour = await Tour.findOne({_id: id}); // Muadil
  const tour = await Tour.findById(id);

  // eğerki tur bulunamamışsa hata döndür
  if (!tour) {
    throw new NotFound("Aradığınız tur bulunamadı");
  }

  // client'a cevap gönderme
  res.status(200).json({ message: "Tur bulundu", data: tour });
});

export const createTour = catchAsync(async (req, res) => {
  // isteğin body kısmındaki veriye eriş
  const body = req.body;

  // yeni turu veritabanına kaydet
  const newTour = await Tour.insertOne(body);

  // client'a yanıt gönder
  res.status(201).json({ message: "Yeni tur oluşturuldu", data: newTour });
});

export const updateTour = catchAsync(async (req, res) => {
  // url'den parametre olarak gelen id'ye eriş
  const id = req.params.id;

  // veritabanındaki tur belgesini güncelle
  // const tour = await Tour.findOneAndUpdate({ _id: id }, req.body, { new: true });
  const tour = await Tour.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

  // gelen id parametresine kayıtlı tur yoksa hata döndür
  if (!tour) {
    throw new NotFound("Aradığınız tur bulunamadı");
  }

  // client'a cevap gönder
  res.status(200).json({ message: "Tur güncellendi", data: tour });
});

export const deleteTour = catchAsync(async (req, res) => {
  // url'den gelen id parametresini al
  const id = req.params.id;

  // veritbanındaki id'si bilinen belgeyi kaldır
  const tour = await Tour.findByIdAndDelete(id);

  // id parametresine karşılık belge yoksa hata döndür
  if (!tour) {
    throw new NotFound("Aradığınız tur bulunamadı");
  }

  // client'a cevap gönder
  res.status(204).json({ message: "Tur kaldırıldı" });
});

// en iyi turları almak için url'e eklenicek parametreleri belirleyen mw
export const aliasTopTours = (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query.fields = "name,price,imageCover,summary,ratingsAverage,ratingsQuantity";
  req.query.limit = "5";

  next();
};

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
