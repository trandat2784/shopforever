import postModel from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

const allPost = (req, res) => {};
const createPost = async (req, res) => {
  try {
    console.log("cahay vao create post");
    const { title, description, videoId, category, step } = req.body;
    console.log(title, description, videoId, category)
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
    const postData = {
      title,
      description,
      videoId,
      category,
      step: JSON.parse(step),
      image: imageUrl,
    };
    console.log(postData)
    const post = new postModel(postData);
    await post.save();
    res.json({ success: true, message: "post added" });
  } catch (error) {
    console.error(error);
  }
};
const updatePost = (req, res) => {};
const deletePost = (req, res) => {};

export { allPost, createPost, updatePost, deletePost };
