import { hash } from 'bcrypt';
import { db } from '../index.js';
import {AppError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateEmail, validatePassword,validateUsername } from '../utils/validation.js';

export const userRegister = asyncHandler(async (req, res) => {
    const {username,password,email}=req.body

    // User validation

    if(!username || !password || !email){
        throw new AppError(400,"All fields are required")
    }

    validateEmail(email);
    validateUsername(username);
    validatePassword(password);
    
   
    // CHECKING==> USER is Existed from DB or not

    const userQuery=`SELECT * FROM user WHERE email=${email} OR username=${username}`

    const dbUserResult= await db.get(userQuery)
    if(dbUserResult===undefined){
        // HASHING THE PASSWORD 
        const hashedPassword=await hash(password,10)

        // Inserting the data
        const insertQuery=`INSERT INTO user (username,password,email) VALUES (${username},${hashedPassword},${email})`
        await db.run(insertQuery)
        res.status(200).json(new ApiResponse(200,"User registered successfully"))
    }else{
        throw new AppError(400,"User already exists")
    }

});