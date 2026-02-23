import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { BadRequest, Unauthorized } from "../utils/errors.js";
import catchAsync from "../utils/catchAsync.js";
import sendMail from "../utils/sendMail.js";
import dotenv from "dotenv";
dotenv.config();

// -------- Jwt Tokenı Oluşturun -------------
const signToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ------- Jwt'yi Çerez Olarak Gönderir ------
const createSendToken = (user, res) => {
  // tokenı oluşturur
  const token = signToken(user._id);

  // çerez olarak gönderilecek veriyi belirle
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true, // sadece http protokülne sahip domainlerde seyahat eder
    // secure: true, // sadece https protokülne sahip domainlerde seyahat eder
  });

  // client'a a cevap gönder
  res.status(200).json({ message: "Oturum Açıldı", token, user });
};

// --------------- Kaydol --------------------
export const register = catchAsync(async (req, res) => {
  // veritabanına yeni kullanıcıyı kaydet
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // jwt oluştur
  createSendToken(newUser, res);
});

// --------------- Giriş Yap -----------------
export const login = catchAsync(async (req, res) => {
  //1) body kısmında gelen verilere eriş
  const { email, password } = req.body;

  //2) email ve şifre geldi mi kontrol et
  if (!email || !password) {
    throw new BadRequest("Lütfen email ve şifre giriniz");
  }

  //3) client'dan gelen email sahip kullanıcıyı ara
  const user = await User.findOne({ email });

  //3.1) eğer emaile sahip kullanıcı bulunamazsa hata gönder
  if (!user) throw new Unauthorized("Email veya şifre hatalı");

  //4) client'dan gelen şifre ile veritabanındaki şifre eşleşiyor mu kontrol et
  const isValid = await bcrypt.compare(password, user.password);

  //4.1) şifre yanlışsa hata gönder
  if (!isValid) throw new Unauthorized("Email veya şifre hatalı");

  //5) jwt tokenını oluştur gönder
  createSendToken(user, res);
});

// --------------- Çıkış Yap -----------------
export const logout = (req, res) => {
  res.clearCookie("jwt").status(200).json({ message: "Oturum kapatıldı" });
};

// -------------- Şifremi Unuttum ------------

// a) Eposta adresine şifre sıfırlama bağlantısını gönder
export const forgotPassword = catchAsync(async (req, res) => {
  // 1) eposta adresine göre kullanıcı hesabına eriş
  const user = await User.findOne({ email: req.body.email });

  // kullanıcı varsa token oluştur ve mail gönder
  if (user) {
    // 2) şifre sıfırlama tokeni oluştur ve  veritbanında hashlenmiş halini sakla
    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) şifres sıfırlamak için kullancığı token'ı içeren url'i hazırla
    const url = `${req.protocol}://${req.headers.host}/api/auth/reset-password/${resetToken}`;

    // 4) url'i eposta adresine mail olarak gönder
    await sendMail({
      to: user.email,
      subject: "Şifre Sıfırlama Bağlantısı (10 dakika)",
      text: resetToken,
      html: `
      <h2>Merhaba ${user.name}</h2>
      <p><b>${user.email}</b> eposta adresine bağlı Tourify hesabınız için şifre sıfırlama bağlantısı aşağıdadır</p>
      <a href="${url}">${url}</a>
      <p>Yeni şifre ile birlikte yukarıdaki bağlantıya <i>PATCH</i> isteği atınız</p>
      <p>Eğer bu işlemi siz yapmadıysanız sadece görmezden gelin</p>
      <p><b><i>Tourify Ekibi</i></b></p>
      `,
    });
  }

  // Her durumda aynı response
  res.status(200).json({ message: "Eposta adresine şifre sıfırlama bağlantısı gönderildi", user });
});

// b) Yeni belirlenen şifreyi kaydet
export const resetPassword = catchAsync(async (req, res) => {
  // 1) parametre olarak gelen tokena eriş
  const token = req.params.token;

  // 2) elimizde normal token olduğu için ve veritabanında hashlenmiş hali saklandığı için bunları karşılaştırabilmek için mail ile gelen token'ı hashle
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // 3) hashlenmiş token'la ilişkili veritabanında kayıtlı kullanıcıyı bul
  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

  // 3.1) token geçersiz veya süresi dolmuşsa hata gönder
  if (!user) {
    throw new Unauthorized("Token'ın süresi dolmuş veya geçersiz");
  }

  // 4) kullanıcı bulunduysa ve token geçerliyse kullanıcının bilgilerini güncelle
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 5) client'a cevap gönder
  res.status(200).json({ message: "Şifreniz başarıyla güncellendi" });
});

// -------------- Şifremi Güncelle ------------

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) kullanıcnın bilgilerini al
  const user = req.user;

  // 2) gelen mevcut şifre doğru mu kontrol et
  const isCorrect = await bcrypt.compare(req.body.currentPassword, user.password);

  // 2.1) şifre yanlışsa hata gönder
  if (!isCorrect) throw new BadRequest("Mevcut şifre hatalı girildi");

  // 3) şifre doğruysa yeni şifreyi kaydet
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  user.save();

  // (opsiyonel) token oluştur - yeniden giriş yapmasını istemiyorsak
  return createSendToken(user, res);
});
