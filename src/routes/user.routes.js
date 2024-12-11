import { Router } from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";


export const userRouter=Router();

userRouter.route("/user-register").post(userRegister);
userRouter.route("/user-login").post(userLogin);
