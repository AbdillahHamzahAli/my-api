import express from "express";
import { getUsers, Login, SignUp, updateUser, deleteUser } from "../controllers/AuthController.js";
const router = express.Router();

router.get("/users", getUsers);
router.post("/login", Login);
router.post("/signup", SignUp); // Sign Up
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
