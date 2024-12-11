import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../index.js';
import {AppError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateEmail, validatePassword } from '../utils/validation.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const technicianRegister = asyncHandler(async (req, res) => {
    const {name,password,email, description}=req.body
    let {city,areas,services}=req.body // ALL ARE ARRAY OF STRINGS
    city = JSON.parse(req.body.city);
    areas = JSON.parse(req.body.areas);
    services = JSON.parse(req.body.services);
    console.log(req.file);
    const imageLocalPath= req.file?.path
    console.log(req.body);
    
    // Technician validation

    if(!name && !password && !email && !description && !city && !areas && !services){
        throw new AppError(400,"All fields are required")
    }

    validateEmail(email);
    validatePassword(password);
    
   
    // CHECKING==> technician is Existed from DB or not

    const technicianQuery=`SELECT * FROM technician WHERE email=?`

    const dbTechnicianrResult= await db.get(technicianQuery,[email])
    if(dbTechnicianrResult===undefined){
        // HASHING THE PASSWORD 
        const hashedPassword=await hash(password,10)

        // Uploading to the Cloudinary
        const imageUploaded=await uploadOnCloudinary(imageLocalPath)

        if(!imageUploaded){
            throw new AppError(400,"Image is required")
        }

        // Inserting the data for normal values
        const insertQuery=`INSERT INTO technician (name,password,email,description,rating,image) VALUES (?,?,?,?,?,?)`
        await db.run(insertQuery,[name,hashedPassword,email,description,0,imageUploaded?.url||""])

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
        throw new AppError(400,"Name with this business already exists")
    }
});

export const technicianLogin =asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new AppError(400,"Email and password are required")
    } 

    validateEmail(email)
    validatePassword(password)
    const userQuery=`SELECT * FROM user WHERE email="${email}"`

    const dbUserResult=await db.get(userQuery)
    if(dbUserResult===undefined){
        throw new AppError(400,"User not found")
    }else{
        const hashedPassword=dbUserResult.password
        const isPasswordMatch=await compare(password,hashedPassword)
        if(isPasswordMatch){
            const payload={email,password}
            const jwtToken=jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            res.status(200).cookie("jwtToken",jwtToken).json(new ApiResponse(200,"User logged in successfully",{jwtToken,username:dbUserResult["username"]})) // directly storing in cookies of browser or we can get token from response directly
        }else{
            throw new AppError(400,"Invalid password")
        }
    }
})


