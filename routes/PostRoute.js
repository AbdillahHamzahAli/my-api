import express from "express";
import { deletePost, getAllPost, getPostBySlug, savePost, updatePost } from "../controllers/PostController.js";
import { postValidationRules, updateValidationRules, validate } from "../middleware/validators/PostValidator.js";
import multerStorage from "../middleware/multerStorage.js";
const router = express.Router();

router.get("/posts", getAllPost);
router.get("/posts/:slug", getPostBySlug);
router.post("/posts", [multerStorage, postValidationRules, validate], savePost); //
router.patch("/posts/:slug", [multerStorage, updateValidationRules, validate], updatePost);
router.delete("/posts/:slug", deletePost);

export default router;
