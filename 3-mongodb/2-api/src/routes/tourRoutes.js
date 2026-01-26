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

const router = express.Router();

// TODO: Düzelt
router.route("/api/tours/top-tours").get(aliasTopTours, formatQuery, getAllTours);

router.route("/api/tours/stats").get(getTourStats);

router.route("/api/tours/monthly-plan/:year").get(getMonthlyPlan);

router.route("/api/tours").get(formatQuery, getAllTours).post(createTour);

router.route("/api/tours/:id").get(getOneTour).patch(updateTour).delete(deleteTour);

export default router;
