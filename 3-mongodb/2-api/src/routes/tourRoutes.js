import express from "express";
import {
  getAllTours,
  createTour,
  getOneTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} from "../controllers/tourController.js";
import formatQuery from "../middlewares/formatQuery.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

// TODO: Düzelt
router.route("/top-tours").get(aliasTopTours, formatQuery, getAllTours);

router.route("/stats").get(protect, getTourStats);

router.route("/monthly-plan/:year").get(protect, getMonthlyPlan);

router.route("/").get(formatQuery, getAllTours).post(protect, createTour);

router.route("/:id").get(getOneTour).patch(protect, updateTour).delete(protect, deleteTour);

export default router;
