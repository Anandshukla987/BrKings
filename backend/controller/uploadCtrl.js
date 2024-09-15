const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = async (path) => await cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      // Delete the image from local storage after uploading to Cloudinary
      fs.unlinkSync(path);
    }

    res.json(urls);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading images", error: error.message });
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id);
    res.json({ message: "Deleted", result: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting image", error: error.message });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
