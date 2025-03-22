import { Router } from "express";
import { addNewUser, loginUser, updateUser } from "../controllers/users.js";

//Create an Ad router

const userRouter = Router();

// Defining Ad routes
userRouter.post("/users/register", addNewUser);

userRouter.post("/users/login", loginUser);

userRouter.patch("/users/:id", updateUser);

// export the router

export default userRouter;
