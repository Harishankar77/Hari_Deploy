import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

const port = process.env.PORT || 4000;
const app = express();

// Connect to Database
connectDB();

// ✅ Fix: Allow frontend to access backend
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins, // ✅ Corrected the allowed origin
    credentials: true, // ✅ Allows cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
