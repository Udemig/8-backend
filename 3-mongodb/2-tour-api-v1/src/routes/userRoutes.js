import express from "express";
import { authorizeRoles, protect } from "../middlewares/protect.js";
import {
  createUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.delete("/delete-me", protect, deleteMe);

router.patch("/update-me", protect, updateMe);

router.get("/get-me", protect, getMe);

// bu satırın altındaki bütün route'lara sadece admin rolündeki hesplar erişebilir
router.use(protect, authorizeRoles(["admin"]));

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
