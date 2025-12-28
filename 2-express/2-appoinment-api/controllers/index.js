const fs = require("fs");

/*
 ! Controller
 * iş mantığı (business logic) içeren fonksiyonlardır.
 * HTTP isteğini alır (req)
 * Gerekli işlemleri yapar (veri okuma,yazma,güncelleme,silme)
 * HTTP yanıtı döndürür (res)
*/

// randevu verilini json dosyasından al (json ---> js)
let appointments = JSON.parse(fs.readFileSync(`${__dirname}/../data/db.json`, "utf-8"));

exports.getAllAppointments = (req, res) => {
  res.json({ message: "Randevular listelendi", results: appointments.length, data: appointments });
};

exports.getAppointmentsByDoctor = (req, res) => {
  res.json({ message: "Doktara ait randevular listelendi" });
};

exports.getAppointmentDetail = (req, res) => {
  res.json({ message: "Randevu detayları alındı" });
};

exports.createAppointment = (req, res) => {
  res.json({ message: "Randevu oluşturuldu" });
};

exports.updateAppointment = (req, res) => {
  res.json({ message: "Randevu güncelle" });
};

exports.deleteAppointment = (req, res) => {
  res.json({ message: "Randevu kaldırldı" });
};
