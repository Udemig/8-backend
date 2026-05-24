import express from "express";
import restaurantController from "./restaurant.controller.js";

const router = express.Router();

router.post("/x", restaurantController.x);
router.post("/y", restaurantController.y);
router.post("/z", restaurantController.z);

export default router;
