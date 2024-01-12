import express from "express";
import { getUsers, Login, SignUp, updateUser, deleteUser, Logout } from "../controllers/AuthController.js";
import { createUserValidation, loginUserValidation, updateUserValidation, validate } from "../middleware/validators/UserValidator.js";
const router = express.Router();

router.get("/users", getUsers);
router.post("/login", [loginUserValidation, validate], Login); // Login
router.post("/signup", [createUserValidation, validate], SignUp); // Sign Up
router.get("/logout", Logout); // Logout
router.patch("/users/:id", [updateUserValidation, validate], updateUser);
router.delete("/users/:id", deleteUser);

export default router;
