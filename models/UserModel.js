import mongoose from "mongoose";
import { validateUserEmail, validateUserPassword } from "../validators/UserValidator.js";
import bcrypt from "bcrypt";

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validateUserEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
      minLenght: [6, "Minimum password lenght is 6 characters"],
      validate: {
        validator: validateUserPassword,
        message: "Minimum password lenght is 6 characters",
      },
    },
  },
  { timestamps: true }
);

User.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Users", User);
