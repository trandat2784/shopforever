import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    console.log(userId, items, amount, address);
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({success:true,message:"Order placed"})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });

  }
};
const userOrders = async (req, res) => {

  try {
      const { userId } = req.body;
      const orders = await orderModel.find({ userId });
      res.json({ success: true, orders });
  } catch (error) {
    console.log(error)
      res.json({ success: false,message: error.message });
    
  }

};
const placeOrderStripe = async (req, res) => {};
const placeOrderRazorpay = async (req, res) => {};
const allOrders = async (req, res) => {

  try {
    
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateStatus = async (req, res) => {
 try {
  const {orderId,status}= req.body
  await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({ success: true, message: "status updated " });

 } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
 }

};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
