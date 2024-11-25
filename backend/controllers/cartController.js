import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    console.log("add cart to cart", cartData);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    console.log(cartData);
    res.json({ success: true, message: "Added to cart " });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    console.log("update1", cartData);

    await userModel.findByIdAndUpdate(userId, { cartData });
    console.log("update2",cartData);
    res.json({ success: true, message: "Cart update" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
const getUserCart = async (req, res) => {

try {
  const {userId} = req.body;
  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;
  console.log("lay danh sach",cartData)
  res.json({ success: true, cartData})
} catch (error) {
  res.json({ success: true, cartData });
  
}

};

export { addToCart, updateCart, getUserCart };
