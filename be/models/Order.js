import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        price: Number,
        qty: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
