import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLenght: 6,
    },
  },
  { timestamps: true }
);

User.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

User.statics.update = async function (req) {
  const existingUser = await this.findById(req.params.id);

  if (!existingUser) {
    throw Error("User not Found");
  } else {
    if (req.body.password) {
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    return await this.updateOne({ _id: req.params.id }, { $set: req.body });
  }
};
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
