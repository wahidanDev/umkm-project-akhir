import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; 
import statsRoutes from "./routes/statsRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

import { cloudinary } from "./utils/cloudinary.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", orderRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
