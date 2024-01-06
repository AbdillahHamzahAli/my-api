import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import CONFIG from "./config/environments.js";
import AuthRoute from "./routes/AuthRoute.js";
import TagRoute from "./routes/TagRoute.js";
import PostRoute from "./routes/PostRoute.js";
import multerStorage from "./middleware/multerStorage.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = CONFIG.port || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
// app.use(multerStorage);

// Route
app.use(AuthRoute);
app.use(TagRoute);
app.use(PostRoute);
app.use("/storage/images", express.static(path.join(__dirname, "/storage/images")));

// Database Connection
mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start Server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
