import cloudinary from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
});

const storage = cloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'jpeg', 'png'],
});

// eslint-disable-next-line import/prefer-default-export
export const cloudinaryUpload = () => multer({ storage });
