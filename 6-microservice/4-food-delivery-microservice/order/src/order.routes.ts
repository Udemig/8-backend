import express from "express";
import orderController from "./order.controller.js";

const router = express.Router();

router.post("/x", orderController.x);
router.post("/y", orderController.y);
router.post("/z", orderController.z);

export default router;
