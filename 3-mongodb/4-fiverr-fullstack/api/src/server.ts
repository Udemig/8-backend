import mongoose from "mongoose";
import express from "express";
import { config } from "./config/enviroment.js";
import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import { NotFound } from "./utils/errors.js";
import errorHandler from "./middlewares/error-handler.js";
import cookieParser from "cookie-parser";
import { globalLimiter } from "./utils/rate-limit.js";

// veritabanına bağlan
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("🟢 MongoDB'ye Bağlandı"))
  .catch(() => console.log("🔴 Veritabanına Bağlanamadı"));

// expres uygulmasını oluştur
const app = express();

// middleware'leri tanımla
app.use(express.json());
app.use(cookieParser());

// route'ları tanımla
app.use("/api/auth", authRoutes);
app.use("/api/gigs", globalLimiter, gigRoutes);

// 404 route'u
app.use((req, res, next) => next(new NotFound()));

// global hata middleware'i
app.use(errorHandler);

// api'ın çalışıcağı portu belirle
app.listen(config.PORT, () => console.log(`🔵 Server ${config.PORT} portunu dinlemeye başladı`));
