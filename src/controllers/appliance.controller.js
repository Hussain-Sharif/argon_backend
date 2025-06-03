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


export const createNewAppliance=asyncHandler(async(erq,res)=>{
    let {newAppliance}=req.body 

    if(!newAppliance){
        return res.status(400).json(new ApiResponse(400,"Appliance name is required"))
    }

    newAppliance=newAppliance.trim()
    newAppliance=newAppliance.toLowerCase()

    const checkApplianceQuery=`SELECT * FROM appliances_types WHERE LOWER(name)=?`
    const checkApplianceResult=await db.get(checkApplianceQuery,[newAppliance])
    if(checkApplianceResult){
        return res.status(400).json(new ApiResponse(400,"Appliance/Service already exists"))
    }

    const insertApplianceQuery=`INSERT INTO appliances_types(name) VALUES(?)`
    await db.run(insertApplianceQuery,[newAppliance])
    res.status(200).json(new ApiResponse(200,"Appliance/Service created successfully"))

})