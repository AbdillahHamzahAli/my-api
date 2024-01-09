import * as fs from "node:fs";
import { body, validationResult } from "express-validator";
import Post from "../../models/PostModel.js";

// Create POST
export const postValidationRules = [
  // Title
  body("title").isString().withMessage("Title must be a string").notEmpty().withMessage("Title cannot be empty").isLength({ max: 70 }).withMessage("Maximum title length is 70 characters"),
  // Slug
  body("slug")
    .notEmpty()
    .withMessage("Slug cannot be empty")
    .custom((value) => {
      return Post.find({
        slug: value,
      }).then((post) => {
        if (post.length > 0) {
          return Promise.reject("Slug already in use");
        }
      });
    }),
  //   Thumbnail
  body("thumbnail").optional().isString().withMessage("Thumbnail must be a string"),
  // Description
  body("description").isString().withMessage("Description must be a string").notEmpty().withMessage("Description cannot be empty").isLength({ max: 150 }).withMessage("Maximum description length is 150 characters"),
  // Content
  body("content").isString().withMessage("Content must be a string").notEmpty().withMessage("Content cannot be empty"),
  // Publish
  body("publish").optional().isBoolean().withMessage("Publish value must be a boolean"),
  // Tags
  body("tags").optional().isMongoId().withMessage("Tag must be a MongoDB ID"),
];
// Update POST
export const updateValidationRules = [
  // Title
  body("title").isString().withMessage("Title must be a string").notEmpty().withMessage("Title cannot be empty").isLength({ max: 70 }).withMessage("Maximum title length is 70 characters"),
  // Slug
  body("slug")
    .notEmpty()
    .withMessage("Slug cannot be empty")
    .custom(async (value, { req }) => {
      return Post.find({ slug: { $eq: value, $ne: req.params.slug } }).then((post) => {
        if (post.length > 0) {
          return Promise.reject("Slug already in use " + req.params.slug);
        }
      });
    }),
  //   Thumbnail
  body("thumbnail").optional().isString().withMessage("Thumbnail must be a string"),
  // Description
  body("description").isString().withMessage("Description must be a string").notEmpty().withMessage("Description cannot be empty").isLength({ max: 150 }).withMessage("Maximum description length is 150 characters"),
  // Content
  body("content").isString().withMessage("Content must be a string").notEmpty().withMessage("Content cannot be empty"),
  // Publish
  body("publish").optional().isBoolean().withMessage("Publish value must be a boolean"),
  // Tags
  body("tags").optional().isMongoId().withMessage("Tag must be a MongoDB ID"),
];

export const validate = async (req, res, next) => {
  try {
    validationResult(req).throw();
    const oldPost = await Post.findOne({ slug: req.params.slug });
    // console.log("oldpost ->" + oldPost.thumbnail);
    if (req.file && oldPost.thumbnail != "") {
      fs.unlinkSync(oldPost.thumbnail);
    }
    next();
  } catch (errors) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
      // console.log(`Berhasil dihapus: ${req.file.path}`);
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
      errors: extractedErrors,
    });
  }
};
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }
//   return next();
// };
// const validator = (req, res, next) => {
//     try {
//       validationResult(req).throw();

//       // continue to next middleware
//       next();
//     } catch (errors) {
//       fs.unlink(req.file.path, (err) => {
//         if (err) {multipart/form-data
//           /* HANLDE ERROR */
//         }
//         console.log(`successfully deleted ${req.file.path}`);
//       });

//       // return bad request
//       res.status(400).send(errors);
//     }
//   };
