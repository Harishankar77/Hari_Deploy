import express from "express";
import {
  isAuthenticated,
  Login,
  Logout,
  Register,
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
authRoute.post("/is-auth", userAuth, isAuthenticated);

export default authRoute;
