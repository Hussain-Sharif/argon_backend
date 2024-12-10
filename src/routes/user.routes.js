import { Router } from "express";


export const userRouter=Router();

userRouter.route("/user-register").post();
userRouter.route("/user-login").post();
userRouter.route("/user-logout").post();
userRouter.route("/refresh-token").post();
