import jwt from "jsonwebtoken";
import CONFIG from "../config/environments.js";
import User from "../models/UserModel.js";

export const Auth = (req, res, next) => {
  if (req.path === "/login" || req.path === "/signup" || req.method === "GET") {
    return next();
  }

  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, `${CONFIG.privateKey}`, (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        res.status(401).redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).redirect("/login");
  }
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, `${CONFIG.privateKey}`, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
