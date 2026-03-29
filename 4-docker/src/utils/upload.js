import multer from "multer";
import { BadRequest } from "./errors.js";
import sharp from "sharp";

// diskStorage kurulum (dosyaları sunucuya kaydetmek için)
const diskStorage = multer.diskStorage({
  // dosyanın yükleniceği klasörü belirler
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },

  // dosyanın ismini belirle
  filename: function (req, file, cb) {
    // benzersiz bir sayı oluştur
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // dosya uzantısını belirle
    const ext = file.mimetype.split("/")[1];

    cb(null, "user" + "-" + uniqueSuffix + "." + ext);
  },
});

// memoryStorage kurulum
const memoryStorage = multer.memoryStorage();

// fotoğraf içierği dışındaki dosyları kabul etmeyecek mw
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // eğerki dosya tipi resim ise kabul et
    cb(null, true);
  } else {
    // resim değilse hata fırlat
    cb(new BadRequest("Dosya tipi sadece resim olabilir (jpg,jpeg,png,webp...)"));
  }
};

// multer midlleware kurulum
const upload = multer({ storage: memoryStorage, fileFilter: multerFilter });

/*
 Kullanıcı 4k çözünürlükte 20-30mb bir fotoğrafı profil fotosu olarak yüklmeye çalışabilir.
 Proje içerisinde profile fotoğrafları genelde 40x40 veya 80x80 boyutlarında kullanılır ama kullanıcı fotoğrafı seçerken 2560*1440 gibi yüksek kalite fotoğraf seçebiliri ve herhangi bir işlemden geçirmeden sunucya kaydedersek gereksiz alan kaplar.
 Bu yüzden fotoğrafları sunucuta kaydetmeden önce sharp kütüphanesi ile işleyeceğiz
 */
export const resize = (req, res, next) => {
  // eğer dosya yoksa yeniden boyutlandırma yapma
  if (!req.file) return next();

  // dosya ismi belirle
  const fileName = `user-${req.user.id}-${Date.now()}.webp`;

  // dosyayı işle ve diske kaydet
  sharp(req.file.buffer) //
    .resize(200, 200)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(`uploads/users/${fileName}`);

  // yeni yüklenen dosya yolunu bu middleware'den sonra çalışacak fonksiyona aktar
  req.file = `/uploads/users/${fileName}`;

  next();
};

export default upload;
