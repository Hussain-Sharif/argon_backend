import { Router } from "express"
import { applianceSuggestion } from "../controllers/appliance.controller.js"


export const applianceRouter=Router()

applianceRouter.route("/appliance-suggestions").post(applianceSuggestion)