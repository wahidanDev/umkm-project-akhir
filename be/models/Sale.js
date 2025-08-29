import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  amount: { type: Number, required: true }, 
  date: { type: Date, default: Date.now },  
});

export default mongoose.model("Sale", SaleSchema);