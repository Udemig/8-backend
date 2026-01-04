import express from "express";
import recipeRoutes from "./routes/index.js";
import cors from "cors";

// express kurulum
const app = express();
const port = 3000;

// cors hatalarını önleyen mw
app.use(cors());

// body verisini işleyen mw (json ---> js)
app.use(express.json());

// tarif route'larını express'e tanıt
app.use(recipeRoutes);

// api'ı belirlediğimiz portu dinletmeye başla
app.listen(port, () => {
  console.log(`🚨 Server ${port} portunu dinlemeye başladı 🚨`);
});
