import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongoosedb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js";
import postRouter from "./routes/postRoute.js"

const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()
app.use(express.json())
app.use(cors())

//api endpoint
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter);
app.use("/api/post", postRouter);


app.get('/',(req, res) => {
  res.send("ahsdh")
})

app.listen(port,()=>{
    console.log("listening on",port);
})