import multer from "multer";
// import { multerSaveFilesOrg } from "multer-savefilesorg";
import {v2 as cloudinary} from "multer-storage-cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// export const remoteUpload = multer({
//   storage: multerSaveFilesOrg({
//     apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//     relativePath: "/advertising-api/*",
//   }),
// });

// export const advertImageUpload = multer({
//   storage: multerSaveFilesOrg({
//     apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//     relativePath: "/advertising-api/advert-images/*",
//   }),
// });

// export const advertPicturesUpload = multer({
//   storage: multerSaveFilesOrg({
//     apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//     relativePath: "/advertising-api/advert-pictures/*",
//   }),
// });

export const advertMediaUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    process: {
      folder: "/advertising-api/advert-media",
    },
  })
})
