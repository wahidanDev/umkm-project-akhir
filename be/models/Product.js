import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    image: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isNewProduct: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },        // total produk terjual
    revenue: { type: Number, default: 0 },     // total penjualan
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
