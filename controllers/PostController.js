import Post from "../models/PostModel.js";
import Tag from "../models/TagModel.js";
import * as fs from "node:fs";

// Get  Post
export const getPosts = async (req, res) => {
  try {
    const { tagName } = req.query;
    if (tagName) {
      const tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        return res.status(404).json({ error: "Tag tidak ditemukan" });
      }
      const posts = await Post.find({ tags: tag._id }).populate("tags");
      res.json(posts);
    } else {
      const posts = await Post.find().populate("tags");
      res.json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Post By Slug
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
  const post = new Post(req.body);
  try {
    const insertPost = await post.save();
    res.status(201).json(insertPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Update Post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({ slug: req.params.slug }, { $set: req.body });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
export const deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ slug: req.params.slug });
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};
