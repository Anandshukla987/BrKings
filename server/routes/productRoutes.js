import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  productPhotoController,
  singleProductController,
  deleteProductController,
  updateProductController,
  filterProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//CREATE PRODUCT
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//UPDATE PRODUCT
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//GET ALL PRODUCT
router.get("/get-product", getProductController);

//GET SINGLE PRODUCT
router.get("/single-product/:slug", singleProductController);

//GET PHOTO
router.get("/product-photo/:pid", productPhotoController);

//DELETE PRODUCT
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//FILTER PRODUCT
router.get("/product-filters", filterProductController);

export default router;
