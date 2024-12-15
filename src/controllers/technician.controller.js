import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../index.js';
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateEmail, validateMobileNumber, validatePassword } from '../utils/validation.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const technicianRegister = asyncHandler(async (req, res) => {
    const {name,password,email, description,mobile}=req.body
    let {city,areas,services}=req.body // ALL ARE ARRAY OF STRINGS
    console.log("In server",{city,areas,services})
    city = JSON?.parse(req.body?.city);
    areas = JSON?.parse(req.body?.areas);
    services = JSON?.parse(req.body?.services);
    console.log(req.file);
    const imageLocalPath= req.file?.path
    console.log(req.body);
    
    // Technician validation

    if(!name || !password || !email || !description || !city || !areas || !services || !mobile){
        res.status(400).json(new ApiError(400,"All fields are required"))
    }

    validateEmail(email,res);
    validatePassword(password,res);
    validateMobileNumber(mobile,res);
    
   
    // CHECKING==> technician is Existed from DB or not

    const technicianQuery=`SELECT * FROM technician WHERE email=?`

    const dbTechnicianrResult= await db.get(technicianQuery,[email])
    if(dbTechnicianrResult===undefined){
        // HASHING THE PASSWORD 
        const hashedPassword=await hash(password,10)

        // Uploading to the Cloudinary
        const imageUploaded=await uploadOnCloudinary(imageLocalPath)

        if(!imageUploaded){
           return res.status(400).json(new ApiError(400,"Image is required"))
        }

        // Inserting the data for normal values
        const insertQuery=`INSERT INTO technician (name,password,email,description,rating,image,mobile) VALUES (?,?,?,?,?,?,?)`
        await db.run(insertQuery,[name,hashedPassword,email,description,0,imageUploaded?.url||"",mobile])

        // After Insert int Techinican TABLE. now we Insert the data of Junction TABLES 
        const dbTechnicianrQuery= await db.get(technicianQuery,[email])
        await city.forEach(async(eachCityId)=>{
            await db.run(`INSERT INTO technician_city (technician_id,city_id) VALUES (?,?)`,[dbTechnicianrQuery.id,eachCityId])
        })

        
        await areas.forEach(async(eachAreaId)=>{
            await db.run(`INSERT INTO technician_area (technician_id,area_id) VALUES (?,?)`,[dbTechnicianrQuery.id,eachAreaId])
        })

        await services.forEach(async(eachServiceId)=>{
            await db.run(`INSERT INTO technician_appliance (technician_id,appliance_id) VALUES (?,?)`,[dbTechnicianrQuery.id,eachServiceId])
        })

        const dbTechnicianCheck= await db.get(technicianQuery,[email])

        res.status(200).json(new ApiResponse(200,"Name with this business is registered successfully",dbTechnicianCheck))
    }else{
        return res.status(400).json(new ApiError(400,"Name with this business already exists"))
    }
});

export const technicianLogin =asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
       return  res.status(400).json(new ApiError(400,"Email and password are required"))
    } 

    validateEmail(email,res)
    validatePassword(password,res)

    const userQuery=`SELECT * FROM technician WHERE email=?`

    const dbUserResult=await db.get(userQuery,[email])
    if(dbUserResult===undefined){
       return  res.status(400).json(new ApiError(400,"Business not found"))
    }else{
        console.log(dbUserResult)
        const hashedPassword=dbUserResult.password
        const isPasswordMatch=await compare(password,hashedPassword)
        if(isPasswordMatch){
            const payload={email,password}
            const jwtToken=jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            res.status(200).cookie("jwtToken",jwtToken).json(new ApiResponse(200,"Business logged in successfully",{jwtToken,username:dbUserResult["username"]})) // directly storing in cookies of browser or we can get token from response directly
        }else{
           return res.status(400).json(new ApiError(400,"Invalid password"))
        }
    }
})




export const featuredTechnicians=asyncHandler(async (req,res)=>{
    const {specificCityId,applianceId}=req.body
    const parsedCityId=JSON.parse(specificCityId)
    const parsedApplianceId=JSON.parse(applianceId)
    const technicians=await db.all(`SELECT technician.name,technician.description,technician.mobile,technician.image,technician.rating FROM technician
INNER JOIN technician_appliance ON technician.id=technician_appliance.technician_id
INNER JOIN technician_city ON technician.id=technician_city.technician_id
WHERE technician_city.city_id=? AND technician_appliance.appliance_id=?
    `, [parsedCityId,parsedApplianceId])
    res.status(200).json(new ApiResponse(200,"Technicians fetched successfully",technicians))
})