import mongoose from "mongoose";
import { validateUserEmail, validateUserPassword } from "../validators/UserValidator.js";
import bcrypt from "bcrypt";

const User = mongoose.Schema(
  {
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
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

User.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

export default mongoose.model("Users", User);
