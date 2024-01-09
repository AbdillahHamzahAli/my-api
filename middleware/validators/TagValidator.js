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

export const updatedTagValidator = [
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

export const validate = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (errors) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({ errors: extractedErrors });
  }
};
