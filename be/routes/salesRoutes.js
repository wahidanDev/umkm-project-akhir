// routes/sales.js
import express from "express";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/monthly", async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    const data = sales.map((s) => ({
      month: bulan[s._id - 1],
      penjualan: s.total,
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
