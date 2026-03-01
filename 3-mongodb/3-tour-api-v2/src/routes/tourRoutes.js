import express from "express";
import {
  getAllTours,
  createTour,
  getOneTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
} from "../controllers/tourController.js";
import formatQuery from "../middlewares/formatQuery.js";
import { protect, authorizeRoles } from "../middlewares/protect.js";

const router = express.Router();

router.route("/stats").get(protect, authorizeRoles("admin"), getTourStats);

router.route("/monthly-plan/:year").get(protect, authorizeRoles("admin"), getMonthlyPlan);

router.route("/").get(formatQuery, getAllTours).post(protect, authorizeRoles("lead-guide", "admin"), createTour);

router
  .route("/:id")
  .get(getOneTour)
  .patch(protect, authorizeRoles("guide", "lead-guide", "admin"), updateTour)
  .delete(protect, authorizeRoles("lead-guide", "admin"), deleteTour);

router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(getDistances);

export default router;
