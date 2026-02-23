import mongoose, { Types } from "mongoose";
import Tour from "./tourModel.js";

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Yorum içeriği boş olamaz"],
    },
    rating: {
      type: Number,
      min: [1, "Puan en az 1 olabilir"],
      max: [5, "Puan en fazla 5 olabilir"],
      required: [true, "Puan alanı boş olamaz"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Yorum yapan kullanıcı bilgisi boş olamaz"],
    },
    tour: {
      type: Types.ObjectId,
      ref: "Tour",
      required: [true, "Yorum yapılan tur bilgisi boş olamaz"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// bir kullanıcnın aynı tura birden fazla yorum atmasını engelle
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// bir tur için  turun rating ortalamasını hesaplayan fonksiyon
reviewSchema.statics.calcRating = async function (tourId) {
  const result = await this.aggregate([
    // 1) tura ait olan yorumları al
    {
      $match: {
        tour: tourId,
      },
    },
    // 2) toplam yorum sayisi ve rating ortalamsını hesapla
    {
      $group: {
        _id: "$tour",
        ratingsQuantity: {
          $sum: 1,
        },
        ratingsAverage: {
          $avg: "$rating",
        },
      },
    },
  ]);

  if (result.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: result[0].ratingsAverage.toFixed(2),
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: null,
      ratingsQuantity: 0,
    });
  }
};

// her yeni yorum atıldığında / silindiğinde / güncellendiğinde yuakrıdaki rating hesaplayan fonksiyonu çağırıp güncel rating değerleri ile tur belgesi güncellenmeli
reviewSchema.post("save", function () {
  Review.calcRating(this.tour);
});
reviewSchema.post(/^findOneAnd/, function (doc) {
  Review.calcRating(doc.tour._id);
});

// yapılan sorgulardan önce kullanıcı ve tur bilgilerini doldurcak middleware
reviewSchema.pre(/^find/, function () {
  this.populate("user", "name photo").populate("tour", "name summary");
});

// model oluştur
const Review = mongoose.model("Review", reviewSchema);

export default Review;
