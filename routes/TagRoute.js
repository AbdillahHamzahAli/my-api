import express from "express";
import { SaveTag, deleteTag, getTags, getTagsByName, updateTag } from "../controllers/TagController.js";
// import { createTagValidator, validate } from "../middleware/validators/TagValidator.js";
const router = express.Router();

router.get("/tags", getTags);
router.get("/tags/:name", getTagsByName);
router.post("/tags", SaveTag);
router.patch("/tags/:name", updateTag);
router.delete("/tags/:name", deleteTag);

export default router;
