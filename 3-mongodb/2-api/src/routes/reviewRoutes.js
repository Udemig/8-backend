import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getOneReview,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(createReview);

router.route("/:id").get(getOneReview).patch(updateReview).delete(deleteReview);

export default router;
