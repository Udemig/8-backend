import express from "express";
import tourRoutes from "./routes/tourRoutes.js";
import User from "./models/userModel.js";

// express uygulması oluştur
const app = express();

// middlewareler
app.use(express.json());

// tour route'larına projeye tanıt
app.use(tourRoutes);

// server.js'de kullanmak için export et
export default app;
