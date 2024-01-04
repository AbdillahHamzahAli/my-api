import mongoose from "mongoose";
import { validatePostTitle } from "../validators/PostValidator.js";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLenght: [70, "max post title lenght is 70 characters"],
      validate: {
        validator: validatePostTitle,
        message: "max post title lenght is 70 characters",
      },
    },
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publish: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
