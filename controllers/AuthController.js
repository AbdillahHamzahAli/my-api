import User from "../models/UserModel.js";
import UserErrorHandler from "../helper/UserErrorHandler.js";
import jwt from "jsonwebtoken";
import CONFIG from "../config/environments.js";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, `${CONFIG.privateKey}`, { expiresIn: maxAge });
};

//Sign Up
export const SignUp = async (req, res) => {
  const user = new User(req.body);
  try {
    const insertUser = await user.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(insertUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Login
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Logout
export const Logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(440).json({ logout: "yes" });
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.update(req);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
