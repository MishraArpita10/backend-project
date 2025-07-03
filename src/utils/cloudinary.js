import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


    // Configuration
    cloudinary.config({ 
        cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    const uploadOnCloudinary=async (LocalFilePath)=>{
        try {
            if(!LocalFilePath) return null
            //upload the file on cloudinary
          const response=await  cloudinary.uploader.upload(LocalFilePath,{
                resource_type:"auto"

            })
            //file has been sucessflly added
            console.log("File is uploaded on cloudinary",response.url);
            return response;

        } catch (error) {
            fs.unlinkSync(LocalFilePath)//remove the locally saved temporary file as the upload operation got failed
            return null;
        }
    }
