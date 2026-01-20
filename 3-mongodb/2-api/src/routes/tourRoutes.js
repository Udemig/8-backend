import express from "express";
import { getAllTours, createTour } from "../controllers/tourController.js";

const router = express.Router();

router.route("/api/tours").get(getAllTours).post(createTour);

export default router;
