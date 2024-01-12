import { body, validationResult } from "express-validator";
import User from "../../models/UserModel.js";

export const loginUserValidation = [body("email").isEmail().withMessage("Invalid email format").notEmpty().withMessage("email required"), body("password").notEmpty().withMessage("password required")];
export const createUserValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      return User.find({ email: value }).then((user) => {
        if (user.length > 0) {
          return Promise.reject("Email Already Registed");
        }
      });
    })
    .notEmpty()
    .withMessage("email required"),
  body("password").isLength({ min: 6 }).withMessage("Minimum password lenght is 6 characters").notEmpty().withMessage("password required"),
];
export const updateUserValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      return User.find({ email: value, _id: { $ne: req.params.id } }).then((user) => {
        if (user.length > 0) {
          return Promise.reject("Email Already Registed");
        }
      });
    })
    .notEmpty()
    .withMessage("email required"),
  body("password").isLength({ min: 6 }).withMessage("Minimum password lenght is 6 characters").notEmpty().withMessage("password required"),
];

export const validate = async (req, res, next) => {
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
