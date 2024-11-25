import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category, 
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    console.log("du lieu",
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    );
    // console.log(image1); //path tu may tinh
    // console.log(imageUrl); //chuyen thanh path url cua cloudinary
    console.log("vao day 1")
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? "true" : "false",
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    }
    console.log("vao day 2")
    console.log(productData)

    const product = new productModel(productData);
    console.log("vao day 3");
    await product.save()
    console.log("vao day 4");

    res.json({ success: true, message: "product added" });
  } catch (error) {
     console.log(error)

  }
};
const listProducts = async (req, res) => {
 try {
  // console.log("vao list products")
  const products = await productModel.find({})
  res.json({success: true,products})
 } catch (error) {
     console.log(error);
  
 }


};

const removeProduct = async (req, res) => {
try {
  // const {id}= req.body
  // console.log("id",id)
  await productModel.findByIdAndDelete(req.body.id)
  res.json({success:true,message:"Product deleted"})
} catch (error) {
     console.log(error);
  
}


};

const singleProduct = async (req, res) => {
try {
  const {productId} = req.body
  const product = await productModel.findById(productId)
  res.json({ success: true, product });
} catch (error) {
       console.log(error);
}

};

export { listProducts, addProduct, removeProduct, singleProduct };
