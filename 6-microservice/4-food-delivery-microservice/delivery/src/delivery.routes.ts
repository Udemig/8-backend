import express from "express";
import deliveryController from "./delivery.controller.js";

const router = express.Router();

router.post("/x", deliveryController.x);
router.post("/y", deliveryController.y);
router.post("/z", deliveryController.z);

export default router;
