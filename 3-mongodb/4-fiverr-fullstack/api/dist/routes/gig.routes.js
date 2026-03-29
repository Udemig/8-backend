import express from "express";
import { getAllGigs, getOneGig, createGig, deleteGig } from "../controllers/gig.controller.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";
// router oluşturma
const router = express.Router();
// endpointleri belirle
router
    .route("/")
    .get(getAllGigs)
    .post(protect, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 6 },
]), createGig);
router.route("/:id").get(getOneGig).delete(protect, deleteGig);
export default router;
//# sourceMappingURL=gig.routes.js.map