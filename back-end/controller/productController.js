const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.json(allProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single Product
const getSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  try {
    const product = await Product.findOne(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createProduct, getAllProducts, getSingleProduct };
