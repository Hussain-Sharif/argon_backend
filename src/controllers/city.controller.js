
import { db } from '../index.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllCities=asyncHandler(async (req,res)=>{
    const cities=await db.all(`SELECT * FROM city`)
    res.status(200).json(new ApiResponse(200,"Cities fetched successfully",cities))
})


export const chosenCityArea=asyncHandler(async (req,res)=>{
    const {specificCityId}=req.body
    const parsedCityId=JSON.parse(specificCityId)
    const areas=await db.all(`SELECT *
FROM area INNER JOIN technician_area ON area.id=technician_area.area_id
WHERE area.city_id=?
GROUP BY area.id
`,[parsedCityId])
    res.status(200).json(new ApiResponse(200,"Areas fetched successfully",areas))
})