import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// env değişkenlere erişebilmek için kurulum
dotenv.config();

// mongodb veritabanına bağla
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB veritabanına bağlandı"))
  .catch(() => console.log("⚠️ Veritabanına bağlanamadı"));

// api'ın dinleyceği portu belirle
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🔵 API ${PORT}. portu dinlemeye başladı`);
});
