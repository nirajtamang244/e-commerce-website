import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();
connectDB();

// Create the express app
const app = express();

// Enable JSON body parsing
app.use(express.json());

// Enable CORS (so frontend can connect later)
app.use(cors());

// Define a simple test route
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", authRoutes);

// Read port number from .env or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
