import 'dotenv/config'
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
cloudinary: cloudinary, 
params: {
  folder: 'image',
},
});

const uploadImage = multer({ storage: storage }); // storage fa parte del multer, il secondo è la constante

export default uploadImage;  


 