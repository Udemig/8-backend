import mongoose from "mongoose";
import express from "express";
import { config } from "./config/enviroment.js";
import authRoutes from "./routes/auth.routes.js";
import { NotFound } from "./utils/errors.js";
import errorHandler from "./middlewares/error-handler.js";

// veritabanına bağlan
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("🟢 MongoDB'ye Bağlandı"))
  .catch(() => console.log("🔴 Veritabanına Bağlanamadı"));

// expres uygulmasını oluştur
const app = express();

// route'ları tanımla
app.use("/api/auth", authRoutes);

// 404 route'u
app.use((req, res, next) => next(new NotFound()));

// global hata middleware'i
app.use(errorHandler);

// api'ın çalışıcağı portu belirle
app.listen(config.PORT, () => console.log(`🔵 Server ${config.PORT} portunu dinlemeye başladı`));
