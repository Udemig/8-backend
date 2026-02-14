import express from "express";
import cookieParser from "cookie-parser";
import tourRoutes from "./routes/tourRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { NotFound } from "./utils/errors.js";

// express uygulması oluştur
const app = express();

// middlewareler
app.use(express.json());
app.use(cookieParser());

// route'ları projeye tanıt
app.use("/api/tours", tourRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// tanımlanmayan route'a istek atılırsa hata gönder
app.use((req, res, next) => next(new NotFound()));

// global hata yönetimi
app.use(errorHandler);

// server.js'de kullanmak için export et
export default app;
