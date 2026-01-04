import express from "express";
import { createRecipe, deleteRecipe, getAllRecipes, getOneRecipe, updateRecipe } from "../controllers/index.js";

// Router() >  server.js dosyası dışarısında route tanımlamak için kullanılır
const router = express.Router();

// api endpointlerini ve istek gelince çalışıcak fonksiyonları belirle

router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getOneRecipe).patch(updateRecipe).delete(deleteRecipe);

// servera route'ları tanıtmak için export et
export default router;
