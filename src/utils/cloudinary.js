import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'



    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    

export const uploadOnCloudinary=async (localFilePath)=> {
    try {
        if(!localFilePath) return null
        const uploadedResponse=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"}) // here we can specify the public Id or else it will be auto generated
        console.log("File Uploaded Successfully in Cloudinary","& File URL",uploadedResponse.url)
        fs.unlinkSync(localFilePath)
        console.log("Now after the image is being uploaded in cloudinary File in local is removed")
        return uploadedResponse
    } catch (error) {
        console.log("Cloudinary Error",error)
        fs.unlinkSync(localFilePath) // To remove it when it fail and make sure it should remove the file from the local file structure
        return null
    }
}