import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
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

//GET ALL PRODUCT
router.get("/get-product", getProductController);

export default router;
