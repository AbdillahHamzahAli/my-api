import Tag from "../models/TagModel.js";
import handleErrors from "../helper/TagErrorHandler.js";

// Get Tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Tag By Name
export const getTagsByName = async (req, res) => {
  try {
    const tags = await Tag.findOne({ name: req.params.name });
    res.json(tags);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Save Tag
export const SaveTag = async (req, res) => {
  const tag = new Tag(req.body);
  try {
    const insertTag = await tag.save();
    res.status(201).json(insertTag);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
// Update
export const updateTag = async (req, res) => {
  try {
    const updatedTag = await Tag.updateOne({ name: req.params.name }, { $set: req.body });
    res.status(200).json(updatedTag);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
//   Delete
export const deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.deleteOne({ name: req.params.name });
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};
