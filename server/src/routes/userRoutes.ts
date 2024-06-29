import express, { Router } from "express";
import {
            authUser,
            registerUser,
            logoutUser,
            getUserProfile,
            updateUserProfile,
} from "@src/controllers/userController";
import { protect } from "@src/middleware/authMiddleware";

const router: Router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile")
            .get(protect, getUserProfile)
            .put(protect, updateUserProfile);

export default router;
