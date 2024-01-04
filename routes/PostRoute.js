import express from "express";
import { getAllPost, getPostBySlug, savePost } from "../controllers/PostController.js";
const router = express.Router();

router.get("/posts", getAllPost);
router.get("/posts/:slug", getPostBySlug);
router.post("/posts", savePost);
// router.patch("/tags/:name", updateTag);
// router.delete("/tags/:name", deleteTag);

export default router;
