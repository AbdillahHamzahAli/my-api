import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import CONFIG from "./config/environments.js";
import AuthRoute from "./routes/AuthRoute.js";
import TagRoute from "./routes/TagRoute.js";
import PostRoute from "./routes/PostRoute.js";
import { Auth, checkUser } from "./middleware/AuthMiddleware.js";

const app = express();
const PORT = CONFIG.port || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.get("*", checkUser);

// Route
app.use(Auth);
app.use(AuthRoute);
app.use(TagRoute);
app.use(PostRoute);

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
