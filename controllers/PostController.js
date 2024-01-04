import handleErrors from "../helper/PostErrorHandler.js";
import Post from "../models/PostModel.js";

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SavePost
export const savePost = async (req, res) => {
  const { body, file } = req;
  const post = new Post({ ...body });
  try {
    const insertPost = await post.save();
    res.status(201).json(insertPost);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
