import cloudinary from "cloudinary";
const v2 = cloudinary.v2;

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (
  file: string,
  options: cloudinary.UploadApiOptions,
  callback: cloudinary.UploadResponseCallback
) => {
  await v2.uploader.upload(file, options, callback);
};
