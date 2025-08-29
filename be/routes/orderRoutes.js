    import express from "express";
    import Order from "../models/Order.js";
    import Product from "../models/Product.js";
    import { authMiddleware } from "../middlewares/authMiddleware.js";

    const router = express.Router();

    // POST /api/orders/checkout
    router.post("/orders/checkout", authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Keranjang kosong" });
    }

    // Simpan order baru
    const order = new Order({
      user: req.user.id,
      items,
      total,
    });
    await order.save();

    // Update jumlah terjual dan revenue di Product
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 
          sold: item.qty || 1,
          revenue: (item.qty || 1) * item.price
        },
      });
    }

    res.status(201).json({ message: "Checkout berhasil", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


    export default router;
