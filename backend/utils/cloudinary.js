const cloudinary = require("cloudinary").v2; // Make sure to use cloudinary.v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = (fileToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileToUpload,
      { resource_type: "auto" }, // Optional: Specify additional options here
      (error, result) => {
        if (error) reject(error);
        else
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
      }
    );
  });
};

const cloudinaryDeleteImg = (fileToDelete) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      fileToDelete,
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
