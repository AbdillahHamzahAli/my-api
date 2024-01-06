import express from "express";
import { deletePost, getAllPost, getPostBySlug, savePost } from "../controllers/PostController.js";
import { postValidationRules, validate } from "../middleware/PostValidator.js";
import multerStorage from "../middleware/multerStorage.js";
const router = express.Router();

router.get("/posts", getAllPost);
router.get("/posts/:slug", getPostBySlug);
router.post("/posts", multerStorage, postValidationRules, validate, savePost); //
// router.patch("/tags/:name", updateTag);
router.delete("/posts/:slug", deletePost);

export default router;
