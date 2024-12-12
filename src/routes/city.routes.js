import { Router } from "express";
import { chosenCityArea, getAllCities } from "../controllers/city.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";



export const citiesRouter=Router()

citiesRouter.route("/all-cities").get(verifyToken,getAllCities)
citiesRouter.route("/chosen-city-area").post(verifyToken,chosenCityArea)