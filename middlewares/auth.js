import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";

// User authenticating middleware
export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

// User authorization middleware
export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    // find the user by ID
    const user = await UserModel.findById(req.auth.id);
    // check if roles includes user role(s)
    if (roles?.includes(user.role)) {
      next();
    } else {
      res.status(403).json("You are not authorized!");
    }
  };
};
