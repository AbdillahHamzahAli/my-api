import mongoose from "mongoose";

const TagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tags", TagSchema);
