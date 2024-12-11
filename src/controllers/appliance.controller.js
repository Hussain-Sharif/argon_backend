import { asyncHandler } from "../utils/asyncHandler.js";
import { db } from "../index.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const applianceSuggestion=asyncHandler(async (req,res)=>{
    const {searchedAppliance}=req.body


    const searchedApplianceQuery=`SELECT name,id AS appliance_id
        FROM appliances_types 
        WHERE LOWER(name) LIKE ? 
        ORDER BY name`

    const searchedApplianceResult=await db.all(searchedApplianceQuery,[`%${searchedAppliance.toLowerCase()}%`])
    res.status(200).json(new ApiResponse(200,"Appliances fetched successfully",searchedApplianceResult))
})