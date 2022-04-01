const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

export default async function handler(req, res) {
  const { image } = JSON.parse(req.body);
  
  const results = await cloudinary.uploader.upload(image, 
    { ocr: "adv_ocr" },
    
  );
  res.status(200).json(results);
}