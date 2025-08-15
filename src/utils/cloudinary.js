import { v2 } from "cloudinary";
import fs from "fs";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREAT,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const responce = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has to be applod successfully
    console.log("file apploded on cloudinary", responce.url);
    fs.unlinkSync(localFilePath);
    return responce;
  } catch (error) {
    fs.unlinkSync(localFilePath); // to delete the file from server
  }
};

export { uploadOnCloudinary };
