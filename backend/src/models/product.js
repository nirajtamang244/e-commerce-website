import mongoose from "mongoose";

// Define how each Product should look
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    category: { type: String, required: true },
    countInStock: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Create the Product model based on the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
