import { Router } from "express";
import { chosenCityArea, getAllCities } from "../controllers/city.controller.js";



export const citiesRouter=Router()

citiesRouter.route("/all-cities").get(getAllCities)
citiesRouter.route("/chosen-city-area").post(chosenCityArea)