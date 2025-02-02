import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { getUserData } from "../controllers/userControler.js";

const userRoute = express.Router();

userRoute.get("/data", userAuth, getUserData);

export default userRoute;
