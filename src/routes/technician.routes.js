import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { technicianRegister,technicianLogin, featuredTechnicians } from "../controllers/technician.controller.js";

export const technicianRouter=Router();

technicianRouter.route("/technician-register").post(upload.single("image"),technicianRegister);
technicianRouter.route("/technician-login").post(technicianLogin);
technicianRouter.route("/featured-technicians").get(featuredTechnicians)