import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// POST /api/products — add a product to the database
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } =
      req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products — list all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
