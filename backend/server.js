import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";

dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes);

app.listen(PORT, (req,res) => {
    console.log(`Server running at ${PORT}`);
    connectDB();
})