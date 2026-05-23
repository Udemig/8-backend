import dotenv from "dotenv";

/*
 * Auth Service
 --------------
 * Servis ayağa kalkma sırası:
 * 1) .env yükle
 * 2) env şemasını doğrula (eksik/yanlış varsa hemen kapat - fail fast)
 * 3) MongoDB'ye bağlan
 * 4) RabbitMQ'ya bağlan
 * 5) Express'i ayağa kaldır (yukarıdaki üçü başarılıysa)
 * 6) todo
*/

// 1) .env yükle
dotenv.config();

console.log(process.env);
