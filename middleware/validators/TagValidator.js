import { body, validationResult } from "express-validator";
import Tag from "../../models/TagModel.js";

export const createTagValidator = [
  body("name")
    .notEmpty()
    .withMessage("Please enter tag name")
    .custom((value) => {
      return Tag.find({
        name: value,
      }).then((tag) => {
        if (tag.length > 0) {
          return Promise.reject("Tag name already in use");
        }
      });
    }),
];

export const updateTagValidator = [
  body("name")
    .notEmpty()
    .withMessage("Please enter tag name")
    .custom((value, { req }) => {
      return Tag.find({
        name: { $eq: value, $ne: req.params.name },
      }).then((tag) => {
        if (tag.length > 0) {
          return Promise.reject("Tag name already in use");
        }
      });
    }),
];

export const validate = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (errors) {
    const formattedErrors = {};
    errors.array().forEach((err) => {
      formattedErrors[err.path] = err.msg;
    });
    return res.status(400).json({ errors: formattedErrors });
  }
};
