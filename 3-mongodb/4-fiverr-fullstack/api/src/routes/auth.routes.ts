import express from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";

// 1) router oluşturma
const router = express.Router();

// 2) endpointleri belirle
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(profile);

// 3) router'ı app'e tanıtmak için export et
export default router;
