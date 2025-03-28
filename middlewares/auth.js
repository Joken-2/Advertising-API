import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";

// User authenticating middleware
export const isAuthenticated = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);
  return expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
    requestProperty: "user",
  }) (req,res,next);
};

// User authorization middleware
export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      // find the user by ID
      const user = await UserModel.findById(req.user.id);
      // check if roles includes user role(s)
      if (roles?.includes(user.role)) {
        next();
      } else {
        res.status(403).json("You are not authorized!");
      }
    } catch (error) {
      console.error("Error in isAuthorized:", error);
      res.status(500).json("Internal server error");
      
    }
  };
};
