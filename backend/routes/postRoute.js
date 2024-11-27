import express from "express";
import { allPost, createPost, updatePost } from "../controllers/postController.js";
import adminAuth from "../middleware/adminAuth.js";
import upLoad from "../middleware/multer.js";
const postRouter = express.Router();

postRouter.get("/list",allPost)
postRouter.post(
  "/create",
  adminAuth,
  upLoad.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createPost
);
postRouter.post("/update",adminAuth, updatePost);
postRouter.post("/delete",adminAuth, createPost);

export default postRouter