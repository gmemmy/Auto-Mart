import cloudinary from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloudinary_cloud_name: process.env.cloudinary_cloud_name,
  cloudinary_api_key: process.env.cloudinary_api_key,
  cloudinary_api_secret: process.env.cloudinary_api_secret,
});

const storage = cloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'jpeg', 'png'],
});

// eslint-disable-next-line import/prefer-default-export
export const cloudinaryUpload = () => multer({ storage });
