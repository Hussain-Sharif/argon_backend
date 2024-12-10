import { Router } from "express";
import { upload } from "../middlewares/multer";

export const technicianRouter=Router();

technicianRouter.route("/technician-register").post(upload.single("avatar"),);
technicianRouter.route("/technician-login").post();
technicianRouter.route("/technician-logout").post();
technicianRouter.route("/refresh-token").post();