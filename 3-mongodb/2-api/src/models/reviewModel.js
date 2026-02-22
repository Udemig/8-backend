import mongoose, { Types } from "mongoose";

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

// yapılan sorgulardan önce kullanıcı ve tur bilgilerini doldurcak middleware
reviewSchema.pre(/^find/, function () {
  this.populate("user", "name photo").populate("tour", "name summary");
});

// model oluştur
const Review = mongoose.model("Review", reviewSchema);

export default Review;
