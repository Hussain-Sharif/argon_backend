import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../index.js';
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateEmail, validatePassword,validateUsername } from '../utils/validation.js';

export const userRegister = asyncHandler(async (req, res) => {
    const {username,password,email}=req.body

    console.log(req.body);
    
    // User validation

    if(!username || !password || !email){
       return res.status(400).json(new ApiError(400,"All fields are required"))
    }

    validateEmail(email,res);
    validateUsername(username,res);
    validatePassword(password,res);
    
   
    // CHECKING==> USER is Existed from DB or not

    const userQuery=`SELECT * FROM user WHERE email=? OR username=?`

    const dbUserResult= await db.get(userQuery,[email,username])
    if(dbUserResult===undefined){
        // HASHING THE PASSWORD 
        const hashedPassword=await hash(password,10)

        // Inserting the data
        const insertQuery=`INSERT INTO user (username,password,email) VALUES (?,?,?)`
        await db.run(insertQuery,[username,hashedPassword,email])
        res.status(200).json(new ApiResponse(200,"User registered successfully"))
    }else{
       return res.status(400).json(new ApiError(400,"User already exists"))
    }
});

export const userLogin =asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
       return res.status(400).json(new ApiError(400,"Email and password are required"))
    } 

    validateEmail(email,res)
    validatePassword(password,res)
    const userQuery=`SELECT * FROM user WHERE email=?` // To Avoid SQL injection we use paramatized quering

    const dbUserResult=await db.get(userQuery,[email])
    if(dbUserResult===undefined){
       return res.status(400).json(new ApiError(400,"User not found"))
    }else{
        const hashedPassword=dbUserResult.password
        const isPasswordMatch=await compare(password,hashedPassword)
        if(isPasswordMatch){
            const payload={email,password}
            const jwtToken=jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            res.status(200).cookie("jwtToken",jwtToken).json(new ApiResponse(200,"User logged in successfully",{jwtToken,username:dbUserResult["username"],type:"user",email:dbUserResult["email"]})) // directly storing in cookies of browser or we can get token from response directly
        }else{
           return res.status(400).json(new ApiError(400,"Invalid password"))
        }
    }
})

