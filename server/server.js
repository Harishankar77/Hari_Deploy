import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoute from "./routes/authRoute.js";
const port = process.env.PORT || 4000;
const app = express();
// Calling DataBase
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

// All API's
app.use("/api/auth", authRoute);

// app.use("/", (req, res) => {
//   res.send(`API is Working`);
// });

app.listen(port, () => {
  console.log(`app is listening on PORT : ${port}`);
});
