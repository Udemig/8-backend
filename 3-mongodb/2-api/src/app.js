import express from "express";
import tourRoutes from "./routes/tourRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

// express uygulması oluştur
const app = express();

// middlewareler
app.use(express.json());
app.use(cookieParser());

// route'ları projeye tanıt
app.use("/api/tours", tourRoutes);
app.use("/api/auth", authRoutes);

// server.js'de kullanmak için export et
export default app;
