/*
 ! Mongoose'da neden MODEL'E ihityaç duyarız
 * Bir kolleksiyona yeni bir veri eklerken, eklenicek olan verinin bir kısıtlamaya tabi tutulmasını isteriz. Örneğin users kolleksiyonundaki her bir belgenin name, surname, age değerlerinin zorunlu olmasını isteyebiliriz.
 * Kaydedilecek olan her bir veri öncelikle modeldeki kısıtlamalara uyuyor mu kontrol edilir eğerki uymuyosa hata fırlatır kısıtlamaya uyuyorsa veritabanına kaydedilir (VALİDASYON)
 * Bu sayede kolleksiyonda tutulan belgelerin daha tutarlı olmasını sağlar
*/

import mongoose from "mongoose";
import validator from "validator";

// veritabanına kaydedilecek tur verisinin zorunlu alanlarını tanımladığımız şema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "İsim zorunludur"],
      validate: [(val) => validator.isAlphanumeric(val, "tr-TR", { ignore: " " }), "İsimde özel karaktrer olamaz"],
    },

    duration: {
      type: Number,
      required: [true, "Süre zorunludur"],
    },

    premium: { type: Boolean },

    durationHour: {
      type: Number,
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

    priceDiscount: {
      type: Number,

      // custom validator (kendi yazdığımız kontrol methodları)
      // doğrulama fonksiyonları false return ederse doğrulamadan geçmedi anlamına gelir ve belge veritabanına kaydedilmez, true return ederse doğrulamadan geçti anlamına gelir ve veritabanına kaydedilir
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "İndirim fiyatı asıl fiyattan büyük olamaz",
      },
    },

    summary: { type: String, required: [true, "Özet zorunludur"] },

    description: { type: String, required: [true, "Açıklama zorunludur"] },

    imageCover: { type: String, required: [true, "Kapak fotoğrafı zorunludur"] },

    images: { type: [String], required: [true, "Fotoğraflar zorunludur"] },

    startDates: { type: [Date], required: [true, "Başlangıç tarihleri zorunludur"] },

    // embedding
    startLocation: {
      description: String,
      type: { type: String, default: "Point", enum: ["Point"] },
      coordinates: [Number],
      address: String,
    },

    // embedding
    locations: [
      {
        description: String,
        type: { type: String, default: "Point", enum: ["Point"] },
        coordinates: [Number],
        day: Number,
      },
    ],

    // referecing (child)
    guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { id: false, versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

//! Virual Populate
// Normalde biz yorumların id'lerini tur belgesi içerisinde saklamamıza rağmen  tur bilgilerini client'a gönderirken yorumları da dahil etmek istiyoruz. Bu noktada yorum id'leri normalde tur içerisinde kayıtlı olmamasına rağmen virtual populate sayesinde yorumları da dahil edebiliriz
tourSchema.virtual("reviews", {
  ref: "Review", // ilişkilendirilmek istenen model
  localField: "_id", // tur modelindeki id alanı
  foreignField: "tour", // yorum modelindeki tur alanı
});

//! Virtual Property (Sanal Özellik)
// Örn: Şuan veritabanına turların fiyatlarını ve indirim fiyatını tutuyoruz ama frontend bizden indiirimli fiyatıda istedi. Bu noktada indirimli fiyatı veritabanında tutmak gereksiz bir maaliyet olur. Bunun yerine cevap gönderme sırasında indirimli fiyat alanını hesaplayıp gönderilecek cevaba eklersek hem frontend'in ihtiyacını karşılamış oluruz hem de veritabanında gereksiz veri olmaz
// tourSchema.virtual("discountedPrice").get(function () {
//   return this.price - this.priceDiscount;
// });

// Örn: Fronten bizden yönlendirme için ürünlerin slug verisini istedi. Bu noktada bu alanı zaten tur ismi üzerinden hesaplayabilceğimiz için veritbanına kaydetmeden virtual property olarak göndermek mantıklı olur
// Ege Doğa Gezisi ===> ege-doğa-gezisi
tourSchema.virtual("slug").get(function () {
  return this.name.replaceAll(" ", "-").toLowerCase();
});

//! Document Middleware
// Bir belgenin kaydedilme, güncelleme, silinme, okunma gibi olaylarından önc eveya sonra gerçekleştirlmesi gerek işlemleri belirlemek için kullanılır.
// Örn: Client'tan gelen tur versisinin veritbanına kaydedilmeden önce bir işlemden geçmesini istediğimizde kullanılabilir
tourSchema.pre("save", function () {
  // gerekli işlemleri yap
  this.durationHour = this.duration * 24;
});

//? pre() işlemden önce post() işlemden sonra middleware'i çalıştırmaya yarar
tourSchema.post("findOneAndUpdate", function (doc) {
  // kullanıncın şifresini güncelleme işleminden sonra kullanıcıya mail gönderilir..
  console.log(doc._id + " kullanıcıya mail göndeirildi");
});

//! Query Middleware
// Sorgulardan önce/sonra çalışan fonksiyonlar
tourSchema.pre("find", function () {
  // premium olan turları dahil etme
  this.find({ premium: { $ne: true } });
});

//! Aggregate Middleware
tourSchema.pre("aggregate", function () {
  // premium olan turları rapora dahil etme
  this.pipeline().unshift({ $match: { premium: { $ne: true } } });
});

// yukarıdaki şemayı kullanarak bir model oluştur
const Tour = mongoose.model("Tour", tourSchema);

// controller'da kullanbilmek için export et
export default Tour;
