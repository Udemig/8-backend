import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

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

    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    passwordChangedAt: { type: Date },
  },
  // timeStamps: belgeye otomatik olarak createdAt ve updatedAt alanları ekler
  {
    timestamps: true,
    versionKey: false,
    // client'a veri gönderilmeden hemen önce json formatında çevrilirken çalışır
    toJSON: {
      transform: function (doc, ret) {
        // password alanını client'a göndermek istediğimiz için gönderilecek belgeden çıkarıyoruz
        delete ret?.password;
        delete ret?.passwordResetToken;
        delete ret?.passwordResetExpires;
      },
    },
  },
);

//? Veritabanına kaydedilmeden önce:
//* passwordConfirm alanını kaldır
//* password alanını şifreleme algoritmaları ile şifrele
userSchema.pre("save", async function () {
  // kaydedilen kullanıcı parolasını değiştirmediyse fonksiyonu durdur
  if (!this.isModified("password")) return;

  // şifreyi saltla ve hashle
  this.password = await bcrypt.hash(this.password, 10);

  // onay şifresini kaldır
  this.passwordConfirm = undefined;
});

//? Belge güncellendiğinde çalışır:
//* şifre güncellendiyse
//* şifre değişim tarihini belgeye ekle
userSchema.pre("save", function (next) {
  // eğer şifre alanı güncellenmediyse veya döküman daha yeni oluşturulduysa bu mw'i atla sıradaki adımla devam et
  if (!this.isModified("password") || this.isNew) return next();

  // şifre değiştirme tarihini güncelle
  // şifre değişiminden hemen sonra jwt tokenı oluşturusak tarih çakışması yaşanmamsı için şifre güncelleme tarihini 1 saniye az gir
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

//? Model'in içerine tanımlı bir fonksiyon
//* Şifre sıfırlama tokeni oluştur
userSchema.methods.createResetToken = function () {
  // 1) 32 byte'lık rastgele bir veri oluştur ve bunu hexadecimal bir string formatına çevir
  const resetToken = crypto.randomBytes(32).toString("hex");

  // 2) tokenı hashle ve vertiabanına kaydet
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // 3) tokenın son geçerlilik tarihini veritabanına kaydet
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // 4) token'ın normal halini return et
  return resetToken;
};

const User = model("User", userSchema);
export default User;
