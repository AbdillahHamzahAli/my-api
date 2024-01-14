import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLenght: 70,
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
      maxLenght: 150,
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
        ref: "Tags",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
