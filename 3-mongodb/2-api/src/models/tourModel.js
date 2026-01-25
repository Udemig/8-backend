/*
 ! Mongoose'da neden MODEL'E ihityaç duyarız
 * Bir kolleksiyona yeni bir veri eklerken, eklenicek olan verinin bir kısıtlamaya tabi tutulmasını isteriz. Örneğin users kolleksiyonundaki her bir belgenin name, surname, age değerlerinin zorunlu olmasını isteyebiliriz.
 * Kaydedilecek olan her bir veri öncelikle modeldeki kısıtlamalara uyuyor mu kontrol edilir eğerki uymuyosa hata fırlatır kısıtlamaya uyuyorsa veritabanına kaydedilir (VALİDASYON)
 * Bu sayede kolleksiyonda tutulan belgelerin daha tutarlı olmasını sağlar
*/

import mongoose from "mongoose";

// veritabanına kaydedilecek tur verisinin zorunlu alanlarını tanımladığımız şema
const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "İsim zorunludur"] },

    duration: {
      type: Number,
      required: [true, "Süre zorunludur"],
    },

    maxGroupSize: { type: Number, required: [true, "Grup Sayısı zorunludur"] },

    difficulty: {
      type: String,
      enum: ["kolay", "orta", "zor", "çok zor"], // değer kısıtlaması
      required: [true, "Zorluk zorunludur"],
    },

    ratingsAverage: {
      type: Number,
      min: [1, "Rating 1'den küçük olamaz"],
      max: [5, "Rating 5'den büyük olamaz"],
      default: 4.0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: { type: Number, min: [0, "Fiyat 0'dan küçük olamaz"], required: [true, "Fiyat zorunludur"] },

    summary: { type: String, required: [true, "Özet zorunludur"] },

    description: { type: String, required: [true, "Açıklama zorunludur"] },

    imageCover: { type: String, required: [true, "Kapak fotoğrafı zorunludur"] },

    images: { type: [String], required: [true, "Fotoğraflar zorunludur"] },

    startDates: { type: [Date], required: [true, "Başlangıç tarihleri zorunludur"] },
  },
  { versionKey: false },
);

// yukarıdaki şemayı kullanarak bir model oluştur
const Tour = mongoose.model("Tour", tourSchema);

// controller'da kullanbilmek için export et
export default Tour;
