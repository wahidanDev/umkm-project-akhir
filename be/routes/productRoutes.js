import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";
import { storage } from "../utils/cloudinary.js";

const upload = multer({ storage });
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get top products (by sold)
router.get("/top", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ sold: -1 })
      .limit(5)
      .select("_id name image price originalPrice discount isNewProduct sold revenue");

    // Hitung tren dibanding bulan sebelumnya jika perlu
    // (misal tetap pakai monthlySales aggregation)

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Create product
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  async (req, res) => {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);
    try {
      const product = new Product({
        name: req.body.name,
        price: Number(req.body.price),
        originalPrice: Number(req.body.originalPrice) || 0,
        discount: Number(req.body.discount) || 0,
        rating: 0,
        isNewProduct: true,
        image: req.file?.path || null,
        category: null,
      });

      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Update product
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        price: req.body.price ? Number(req.body.price) : undefined,
        originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
        discount: req.body.discount ? Number(req.body.discount) : undefined,
      };

      if (req.file) updateData.image = req.file.path;

      const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!product) return res.status(404).json({ error: "Product not found" });

      res.json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Delete product
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
