import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Kullanıcı Şeması
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "İsim alanı zorunludur"],
      minLength: [3, "İsim 3 karakterden kısa olamaz"],
      maxLength: [30, "İsim 30 karakterden uzun olamaz"],
      validate: [(val) => validator.isAlpha(val, "tr-TR", { ignore: " " }), "İsim sadece harflerden oluşabilir"],
    },

    email: {
      type: String,
      required: [true, "Email alanı zorunludur"],
      unique: [true, "Bu eposta adresinda kayıtlı kullanıcı zaten var"],
      validate: [validator.isEmail, "Lütfen geçerli bir mail giriniz"],
    },

    role: {
      type: String,
      enum: ["user", "admin", "guide", "lead-guide"],
      default: "user",
    },

    active: {
      type: Boolean,
      default: true,
    },

    photo: {
      type: String,
      default: "defaultpic",
    },

    password: {
      type: String,
      required: [true, "Şifre alanı zorunludur"],
      minLength: [8, "Şifre en az 8 karakter olmalı"],
      validate: [validator.isStrongPassword, "Şifreniz yeterince güçlü değil"],
    },

    passwordConfirm: {
      type: String,
      required: [true, "Lütfen şifrenizi onaylayın"],
      validate: [
        function (val) {
          return val === this.password;
        },
        "Onay şifreniz eşleşmiyor",
      ],
    },
  },
  // timeStamps: belgeye otomatik olarak createdAt ve updatedAt alanları ekler
  { timestamps: true, versionKey: false },
);

//? Veritabanına kaydedilmeden önce:
//* passwordConfirm alanını kaldır
//* password alanını şifreleme algoritmaları ile şifrele
userSchema.pre("save", async function (doc, next) {
  // kaydedilen kullanıcı parolasını değiştirmediyse fonksiyonu durdur
  if (!this.isModified("password")) return next();

  // şifreyi saltla ve hashle
  this.password = await bcrypt.hash(this.password, 10);

  // onay şifresini kaldır
  this.passwordConfirm = undefined;

  // sonraki işleme devam et
  next();
});

const User = model("User", userSchema);
export default User;
