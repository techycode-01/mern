import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoute.js";
dotenv.config();

const app = express();

// connect DB first
connectDB();

const port = process.env.PORT || 4567;

app.get("/", (req, res) => {
  res.send("Hello, API is running!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});

export default app;