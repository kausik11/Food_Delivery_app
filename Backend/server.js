import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import foodRoute from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors()) //using cors we can connect backend to any frontend

//db connection
connectDB();

//api endpoints
app.use('/api/food',foodRoute);//this route is used for add_item,list_items,remove_item and '/api/food' this is base endpoint. then control goes to foodRoute.js
app.use('/images',express.static("uploads"))//using this endpoints we can access the images that is within uploads folder

app.use('/api/user',userRouter);//this is base endpoint for all the user related like, "user register","Login"

app.use('/api/cart',cartRouter);//this is base endpoint for all the cart related like, "add item to cart","remove item from cart", "get all item from cart", 

app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})