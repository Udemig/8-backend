import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequest, Unauthorized } from "../utils/errors.js";
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
export const register = async (req, res) => {
  try {
    // veritabanına yeni kullanıcıyı kaydet
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // jwt oluştur
    createSendToken(newUser, res);
  } catch (error) {
    res.status(500).json({ message: "İşlem başarısız", message: error.message });
  }
};

// --------------- Giriş Yap -----------------
export const login = async (req, res) => {
  try {
    //1) body kısmında gelen verilere eriş
    const { email, password } = req.body;

    //2) email ve şifre geldi mi kontrol et
    if (!email || !password) {
      return next(new BadRequest("Lütfen email ve şifre giriniz"));
    }

    //3) client'dan gelen email sahip kullanıcıyı ara
    const user = await User.findOne({ email });

    //3.1) eğer emaile sahip kullanıcı bulunamazsa hata gönder
    if (!user) return next(new Unauthorized("Email veya şifre hatalı"));

    //4) client'dan gelen şifre ile veritabanındaki şifre eşleşiyor mu kontrol et
    const isValid = await bcrypt.compare(password, user.password);

    //4.1) şifre yanlışsa hata gönder
    if (!isValid) return next(new Unauthorized("Email veya şifre hatalı"));

    //5) jwt tokenını oluştur gönder
    createSendToken(user, res);
  } catch (error) {
    res.status(500).json({ message: "İşlem başarıssız" });
  }
};

// --------------- Çıkış Yap -----------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt").status(200).json({ message: "Oturum kapatıldı" });
  } catch (error) {
    res.status(500).json({ message: "İşlem başarıssız" });
  }
};
