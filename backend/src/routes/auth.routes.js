import { registerUser ,verifyEmail,loginUser,forgotPassword,changePassword,resetPassword,googleLogin} from "../controllers/auth.controller.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", authMiddleware, changePassword);
router.post("/reset-password", resetPassword);
router.post("/google-login", googleLogin);


export default router;