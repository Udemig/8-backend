import Tour from "../models/tourModel.js";

export const getAllTours = (req, res) => {
  // client'a yanıt gönder
  res.json({ message: "Tur verisi listendi" });
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
    res.status(400).json({ message: "İşlem başarısız" });
  }
};
