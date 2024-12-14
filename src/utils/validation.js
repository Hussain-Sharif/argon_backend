import { ApiError } from "./ApiError.js";



export const validatePassword=(password,res)=>{
    if(password.length<8 || password.length>16){
        res.status(400).json(new ApiError(400,"Password must be between 8 to 16 characters"))
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // console.log(regex.test(password))
    if(regex.test(password)===false){
        res.status(400).json(new ApiError(400,"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"))
    }
}

export const validateEmail=(email,res)=>{
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // console.log(regex.test(email))
    if(regex.test(email)===false){
        res.status(400).json(new ApiError(400,"Invalid email address"))
    }
}

export const validateUsername=(username,res)=>{
    if(username.length<3 || username.length>16){
        res.status(400).json(new ApiError(400,"Username must be between 3 to 16 characters"))
    }

    const regex=/^[a-z0-9_]{3,16}$/; //allowing only small letters, numbers, and underscores
    if(regex.test(username)===false){
        res.status(400).json(new ApiError(400,"Username must contain only small letters, numbers, and underscores"))
    }
}

export const validateMobileNumber=(mobileNumber,res)=>{
    const regex = /^[0-9]{10}$/;
    if(regex.test(mobileNumber)===false){
        res.status(400).json(new ApiError(400,"Invalid mobile number"))
    }
}