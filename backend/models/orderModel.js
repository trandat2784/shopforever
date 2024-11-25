import mongoose, { Types } from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { required: true, type: String },
  items: { required: true, type: Array },
  amount: { required: true, type: Number },
  address: { required: true, type: Object },
  status: { required: true, type: String,default:"Order Placed" },
  paymentMethod: { required: true, type: String },
  payment: { required: true, type: Boolean, default: false },
  date: { required: true, type: Number },
});
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel