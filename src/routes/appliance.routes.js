import { Router } from "express"
import { applianceSuggestion } from "../controllers/appliance.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js"

export const applianceRouter=Router()

applianceRouter.route("/appliance-suggestions").post(verifyToken,applianceSuggestion)
applianceRouter.route("/new-appliance-add").post(verifyToken,createNewAppliance);