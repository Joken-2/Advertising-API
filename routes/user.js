import { Router } from "express";
import { addNewUser, getAuthenticatorUser, loginUser, updateUser } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

//Create an Ad router

const userRouter = Router();

// Defining Ad routes
userRouter.post("/users/register", addNewUser);

userRouter.post("/users/login", loginUser);

userRouter.patch("/users/:id", updateUser);

userRouter.get("/users/me", isAuthenticated, getAuthenticatorUser);

// export the router

export default userRouter;
