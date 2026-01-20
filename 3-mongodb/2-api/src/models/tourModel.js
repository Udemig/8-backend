/*
 ! Mongoose'da neden MODEL'E ihityaç duyarız
 * Bir kolleksiyona yeni bir veri eklerken, ekleneicek olan verinin bir kısıtlamaya tabi tutulmasını isteriz. Örneğin users kolleksiyonundaki her bir belgenin name, surname, age değerlerinin zorunlu olmasını isteyebiliriz.
 * Kaydedilecek olan her bir veri öncelikle modeldeki kısıtlamalara uyuyor mu kontrol edilir eğerki uymuyosa hata fırlatır kısıtlamaya uyuyorsa veritabanına kaydedilir (VALİDASYON)
 * Bu sayede kolleksiyonda tutulan belgelerin daha tutarlı olmasını sağlar
*/

import mongoose from "mongoose";

// veritabanına kaydedilecek tur verisinin zorunlu alanlarını tanımladığımız şema
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },

  rating: { type: Number, min: 1, max: 5, default: 4.0 },

  price: { type: Number, required: true },

  maxGroupSize: { type: Number, required: true },
});

// yukarıdaki şemayı kullanarak bir model oluştur
const Tour = mongoose.model("Tour", tourSchema);

// controller'da kullanbilmek için export et
export default Tour;
