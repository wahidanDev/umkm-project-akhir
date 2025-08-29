import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
    const year = now.getFullYear();

    // Total penjualan semua waktu
    const totalSalesAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    // Total orders semua waktu
    const totalOrders = await Order.countDocuments();

    // Produk terjual semua waktu
    const productsAgg = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: null, total: { $sum: "$items.qty" } } }
    ]);
    const productsSold = productsAgg[0]?.total || 0;

    // Hitung per bulan
    const monthlyStats = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          totalSales: { $sum: "$total" },
          totalOrders: { $sum: 1 },
          totalProducts: { $sum: "$items.qty" },
        },
      },
    ]);

    const thisMonthStats = monthlyStats.find(
      (s) => s._id.year === year && s._id.month === thisMonth
    );
    const lastMonthStats = monthlyStats.find(
      (s) =>
        s._id.year === (lastMonth === 12 ? year - 1 : year) &&
        s._id.month === lastMonth
    );

    const thisMonthSales = thisMonthStats?.totalSales || 0;
    const lastMonthSales = lastMonthStats?.totalSales || 0;
    const thisMonthOrders = thisMonthStats?.totalOrders || 0;
    const lastMonthOrders = lastMonthStats?.totalOrders || 0;
    const thisMonthProducts = thisMonthStats?.totalProducts || 0;
    const lastMonthProducts = lastMonthStats?.totalProducts || 0;

    // Growth calculation
    const calcGrowth = (curr, prev) =>
      prev ? (((curr - prev) / prev) * 100).toFixed(2) : 0;

    res.json({
      totalSales,
      salesGrowth: parseFloat(calcGrowth(thisMonthSales, lastMonthSales)),
      totalOrders,
      ordersGrowth: parseFloat(calcGrowth(thisMonthOrders, lastMonthOrders)),
      productsSold,
      productsGrowth: parseFloat(calcGrowth(thisMonthProducts, lastMonthProducts)),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
