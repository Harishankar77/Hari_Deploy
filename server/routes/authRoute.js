import express from "express";
import {
  isAuthenticated,
  Login,
  Logout,
  Register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authControler.js";
import userAuth from "../middlewares/userAuth.js";

const authRoute = express.Router();
// All Routes End Point
authRoute.post("/register", Register);
authRoute.post("/login", Login);
authRoute.post("/logout", Logout);
authRoute.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRoute.post("/verify-account", userAuth, verifyEmail);
authRoute.get("/is-auth", userAuth, isAuthenticated);
authRoute.post("/send-reset-otp", sendResetOtp);
authRoute.post("/send-password", resetPassword);

export default authRoute;
