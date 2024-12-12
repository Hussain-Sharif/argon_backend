import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { technicianRegister,technicianLogin, featuredTechnicians } from "../controllers/technician.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

export const technicianRouter=Router();

technicianRouter.route("/technician-register").post(upload.single("image"),technicianRegister);
technicianRouter.route("/technician-login").post(technicianLogin);
technicianRouter.route("/featured-technicians").post(verifyToken,featuredTechnicians)