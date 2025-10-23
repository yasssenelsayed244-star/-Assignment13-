import { Router } from "express";
import { signup, getUsers } from "./user.controller";
import { login } from "../../controllers/Login";
import { verifyEmail } from "../../controllers/Auth";
import { resendEmailOtp } from "../../controllers/Resend_Email_Otp";
import { validateCreateUser, validateLogin } from "./user.validation";

const router = Router();

router.post("/signup", validateCreateUser, signup);
router.post("/login", validateLogin, login);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendEmailOtp);
router.get("/", getUsers);

export default router;
