import express from "express";
import { getAllTours, createTour, getOneTour, updateTour, deleteTour } from "../controllers/tourController.js";

const router = express.Router();

router.route("/api/tours").get(getAllTours).post(createTour);

router.route("/api/tours/:id").get(getOneTour).patch(updateTour).delete(deleteTour);

export default router;
