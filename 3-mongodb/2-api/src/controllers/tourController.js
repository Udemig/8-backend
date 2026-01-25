import Tour from "../models/tourModel.js";
import qs from "qs";

export const getAllTours = async (req, res) => {
  try {
    //* client'dan gelen parametreler:    { 'rating[gt]': '4', 'price[lte]': '500' }
    //* mongodb'nin istediği format:      { rating:{ $gt: 4 },  price: { $lte: 500 } }

    // 1) urldeki arama parametrelerine eriş
    const queryObj = qs.parse(req.query);

    // 2) string methodlarını kullanaiblmek için parametler nesnesini stringe çevir
    let queryStr = JSON.stringify(queryObj);

    // 3) bütün operatörlerin başına $ işareti koy
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|ne)\b/g, (found) => `$${found}`);

    // 4) string formatındaki parametleri nesne formatına çevir
    const parsedQuery = JSON.parse(queryStr);

    // veritabanında tur verilerini al
    const tours = await Tour.find(parsedQuery);

    // client'a yanıt gönder
    res.json({ message: "Tur verisi listendi", parsedQuery, results: tours.length, data: tours });
  } catch (error) {
    res.status(400).json({ message: "İşlem başarısız", error: error.message });
  }
};

export const getOneTour = async (req, res) => {
  try {
    // istek ile birlikte gönderilen id parametresine eriş
    const id = req.params.id;

    // veritabanından id'si bilinen turu al
    // const tour = await Tour.findOne({_id: id}); // Muadil
    const tour = await Tour.findById(id);

    // eğerki tur bulunamamışsa hata döndür
    if (!tour) {
      return res.status(404).json({ message: "İşlem başarısız", error: "Aradığınız tur bulunamadı" });
    }

    // client'a cevap gönderme
    res.status(200).json({ message: "Tur bulundu", data: tour });
  } catch (error) {
    res.status(404).json({ message: "İşlem başarısız", error: error.message });
  }
};

export const createTour = async (req, res) => {
  try {
    // isteğin body kısmındaki veriye eriş
    const body = req.body;

    // yeni turu veritabanına kaydet
    const newTour = await Tour.insertOne(body);

    // client'a yanıt gönder
    res.status(201).json({ message: "Yeni tur oluşturuldu", data: newTour });
  } catch (error) {
    res.status(400).json({ message: "İşlem başarısız", error: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    // url'den parametre olarak gelen id'ye eriş
    const id = req.params.id;

    // veritabanındaki tur belgesini güncelle
    // const tour = await Tour.findOneAndUpdate({ _id: id }, req.body, { new: true });
    const tour = await Tour.findByIdAndUpdate(id, req.body, { new: true });

    // gelen id parametresine kayıtlı tur yoksa hata döndür
    if (!tour) {
      return res.status(404).json({ message: "İşlem başarısız", error: "Tur bulunamadı" });
    }

    // client'a cevap gönder
    res.status(200).json({ message: "Tur güncellendi", data: tour });
  } catch (error) {
    res.status(404).json({ message: "İşlem başarısız", error: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    // url'den gelen id parametresini al
    const id = req.params.id;

    // veritbanındaki id'si bilinen belgeyi kaldır
    const tour = await Tour.findByIdAndDelete(id);

    // id parametresine karşılık belge yoksa hata döndür
    if (!tour) {
      return res.status(404).json({ message: "İşlem başarısız", error: "Tur bulunamadı" });
    }

    // client'a cevap gönder
    res.status(204).json({ message: "Tur kaldırıldı" });
  } catch (error) {
    res.status(404).json({ message: "İşlem başarısız", error: error.message });
  }
};
