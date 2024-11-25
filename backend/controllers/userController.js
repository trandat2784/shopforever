import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user dosen't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already registered" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Pls enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: true, message: "Password too weak" });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {
try {
  const {email,password} = req.body
  if( email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.json({success:true,token})
  }
  else{
    res.json({ success: false, message:"Invalid credential" });
  }
} catch (error) {
   res.json({ success: false, message: error });
}

};
export { loginUser, registerUser, adminLogin };
