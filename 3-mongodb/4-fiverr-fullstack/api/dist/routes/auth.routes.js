import express from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import upload from "../utils/multer.js";
import protect from "../middlewares/protect.js";
import { authLimiter, globalLimiter } from "../utils/rate-limit.js";
// 1) router oluşturma
const router = express.Router();
// 2) endpointleri belirle
router.route("/register").post(authLimiter, upload.single("profilePicture"), register);
router.route("/login").post(authLimiter, login);
router.route("/logout").post(authLimiter, logout);
router.route("/profile").get(globalLimiter, protect, profile);
// 3) router'ı app'e tanıtmak için export et
export default router;
//# sourceMappingURL=auth.routes.js.map