import express from "express";

// express uygulması oluştur
const app = express();

// yeni endpoint oluştur
app.get("/api/tours", (req, res) => {
  // clien'ta yanı gönder
  res.json({ message: "Tur verileri listelendi" });
});

// server.js'de kullanmak için export et
export default app;
