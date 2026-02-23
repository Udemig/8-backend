import fs from "fs";
import mongoose from "mongoose";
import Tour from "../models/tourModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js";
import dotenv from "dotenv";
dotenv.config();

// Geliştirme aşamasında mongodb'deki verilerin sıkça değişeceğinden veya silineceğinden dolayı veritabnındaki verileri temizlemeye ve jsson dosyasındaki örnek verileri veritabanına aktarmaya yarayan, terminal komutları ile çalışacak 2 fonksiyon yazalım

// veritabanına bağlan
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Veritabanına bağlanıldı"))
  .catch((err) => console.log("⚠️ Veritabanına bağlanırken hata oluştu", err));

// json dosyasından verileri al
const tours = JSON.parse(fs.readFileSync(`./src/dev-data/data/tours.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`./src/dev-data/data/users.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`./src/dev-data/data/reviews.json`, "utf-8"));

// json dosyasından alınan verileri veritabanına ekleyecek fonksiyon
const importData = async () => {
  try {
    await Tour.create(tours, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews, { validateBeforeSave: false });
    console.log("🟢 Veriler başarıyla yüklendi");
  } catch (error) {
    console.log("⚠️ Veriler yüklenirken hata oluştu", error);
  }
  process.exit();
};

// veritabanındaki tüm verileri silen fonksiyon
const clearData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("🟢 Veriler başarıyla silindi");
  } catch (error) {
    console.log("⚠️ Veriler silinirken hata oluştu", error);
  }
  process.exit();
};

// dosya çalışıtırılırken konumun sonuna eklenen argüma göre çalışacak fonksiyonu seç
if (process.argv.includes("--import")) {
  importData();
} else if (process.argv.includes("--clear")) {
  clearData();
} else {
  console.log("⚠️ Lütfen geçerli bir argüman girin: --import veya --clear");
  process.exit();
}
