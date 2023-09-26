import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.status(500).send({ error: "Name is required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is required" });
    }
    if (!price) {
      return res.status(500).send({ error: "Price is required" });
    }
    if (!category) {
      return res.status(500).send({ error: "Category is required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "Quantity is required" });
    }
    if (photo && photo.size > 2000000) {
      return res
        .status(500)
        .send({ error: "Photo is required and should be less than 2MB" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalProducts: products.length,
      message: "List of All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all products",
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Fetched Single Product Successfullly",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single product",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.status(500).send({ error: "Name is required" });
    }
    if (!description) {
      return res.status(500).send({ error: "Description is required" });
    }
    if (!price) {
      return res.status(500).send({ error: "Price is required" });
    }
    if (!category) {
      return res.status(500).send({ error: "Category is required" });
    }
    if (!quantity) {
      return res.status(500).send({ error: "Quantity is required" });
    }
    if (photo && photo.size > 2000000) {
      return res
        .status(500)
        .send({ error: "Photo is required and should be less than 2MB" });
    }
    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      sucess: false,
      error,
      message: "Error in filtering products",
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in search product",
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related product",
      error,
    });
  }
};

export const addCommentController = async (req, res) => {
  try {
    const prodId = req.params.pid;
    const product = await productModel.findById(prodId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const newComment = {
      text: req.body.text,
      user: req.user._id,
    };
    product.comments.push(newComment);
    await product.save();
    res.status(201).send({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      meesage: "Error while adding comment",
    });
  }
};

export const getCommentsController = async (req, res) => {
  try {
    const prodId = req.params.pid;
    const product = await productModel.findById(prodId);
    if (!product) {
      return res.status(404).send({ message: "No such product exists" });
    }
    res.json({ comments: product.comments });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching products",
    });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const productId = req.params.pid;
    const commentId = req.params.commentId;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const commentIndex = product.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );
    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    product.comments.splice(commentIndex, 1);
    await product.save();

    res.status(200).send({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error while deleting comment",
    });
  }
};
