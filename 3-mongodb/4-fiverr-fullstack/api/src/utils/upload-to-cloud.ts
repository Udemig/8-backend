import type { NextFunction } from "express";
import { config } from "../config/enviroment.js";
import { v2 as cloudinary } from "cloudinary";
import { BadRequest } from "./errors.js";

// cloudinary kurulum
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET,
});

const uploadToCloud = async (
  next: NextFunction,
  file_path: string,
  folder: string,
  width?: number,
  height?: number,
  type: "image" | "video" | "raw" | "auto" = "auto",
) => {
  return await cloudinary.uploader.upload(file_path, { folder, resource_type: type, width, height }, (err) => {
    if (err) return next(new BadRequest());
  });
};

export default uploadToCloud;
