import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { technicianRegister } from "../controllers/technician.controller.js";

export const technicianRouter=Router();

technicianRouter.route("/technician-register").post(upload.single("image"),technicianRegister);
// technicianRouter.route("/technician-login").post();
// technicianRouter.route("/technician-logout").post();
// technicianRouter.route("/refresh-token").post();