import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';


export const verifyToken = asyncHandler(async (req, res, next) => { 

    try {
        const jwtToken = req.cookies.jwtToken || req.headers["authorization"]?.split(" ")[1];

        if(!jwtToken){
            return  res.status(401).json(new ApiError(401,"Unauthorized Request"))
        }

        jwt.verify(jwtToken,process.env.JWT_SECRET_KEY,(error,user)=>{
            if(error){
                return  res.status(401).json(new ApiError(401,"Unauthorized Request"))
            }else{
                next();
            }
        })

        
    } catch (error) {
        return  res.status(401).json(new ApiError(401,"Invalid Access Token"))
    }
})