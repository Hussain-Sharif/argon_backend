import { AppError } from "../utils/ApiError.js";



export const validatePassword=(password)=>{
    if(password.length<8 || password.length>16){
        throw new AppError(400,"Password must be between 8 to 16 characters")
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log(regex.test(password))
    if(regex.test(password)===false){
        throw new AppError(400,"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    }
}

export const validateEmail=(email)=>{
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(regex.test(email))
    if(regex.test(email)===false){
        throw new AppError(400,"Invalid email address")
    }
}

export const validateUsername=(username)=>{
    if(username.length<3 || username.length>16){
        throw new AppError(400,"Username must be between 3 to 16 characters")
    }

    const regex=/^[a-z0-9_]{3,16}$/; //allowing only small letters, numbers, and underscores
    if(regex.test(username)===false){
        throw new AppError(400,"Username must contain only small letters, numbers, and underscores")
    }
}

// validateEmail("sharif@l.comm")
// validatePassword("sdvsdv@51")