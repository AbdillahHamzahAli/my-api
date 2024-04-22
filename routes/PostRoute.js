import express from "express";
import { deletePost, getPosts, getPostBySlug, savePost, updatePost } from "../controllers/PostController.js";
import { postValidationRules, updateValidationRules, validate } from "../middleware/validators/PostValidator.js";
const router = express.Router();

router.get("/posts", getPosts);
router.get("/posts/:slug", getPostBySlug);
router.post("/posts", [postValidationRules, validate], savePost); //
router.patch("/posts/:slug", [updateValidationRules, validate], updatePost);
router.delete("/posts/:slug", deletePost);

export default router;
