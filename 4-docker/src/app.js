import express from "express";
import cookieParser from "cookie-parser";
import tourRoutes from "./routes/tourRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { NotFound } from "./utils/errors.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// express uygulması oluştur
const app = express();

// rate limit
const loginRateLimit = rateLimit({
  windowMs: 5 * 60 * 100,
  max: 5,
  message: "Kısa süre içerisinde çok fazla deneme yaptınız lütfen daha sonra tekrar deneyiniz",
});
const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Kısa süre içerisinde çok fazla deneme yaptınız lütfen daha sonra tekrar deneyiniz",
});

// middlewareler
app.use("/api/auth/", loginRateLimit);
app.use((req, res, next) => {
  if (req.path.startsWith("/api/auth")) return next();
  generalRateLimit(req, res, next);
});
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// route'ları projeye tanıt
app.use("/api/tours", tourRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

// tanımlanmayan route'a istek atılırsa hata gönder
app.use((req, res, next) => next(new NotFound()));

// global hata yönetimi
app.use(errorHandler);

// server.js'de kullanmak için export et
export default app;
