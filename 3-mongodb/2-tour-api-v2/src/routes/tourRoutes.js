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
import { protect, authorizeRoles } from "../middlewares/protect.js";

const router = express.Router();

// TODO: Düzelt
router.route("/top-tours").get(aliasTopTours, formatQuery, getAllTours);

router.route("/stats").get(protect, authorizeRoles("admin"), getTourStats);

router.route("/monthly-plan/:year").get(protect, authorizeRoles("admin"), getMonthlyPlan);

router.route("/").get(formatQuery, getAllTours).post(protect, authorizeRoles("lead-guide", "admin"), createTour);

router
  .route("/:id")
  .get(getOneTour)
  .patch(protect, authorizeRoles("guide", "lead-guide", "admin"), updateTour)
  .delete(protect, authorizeRoles("lead-guide", "admin"), deleteTour);

export default router;
