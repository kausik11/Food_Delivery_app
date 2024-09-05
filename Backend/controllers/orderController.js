import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//using this we will place the user order // placing user order from frontend
const placeOrder = async (req, res) => {

    //for localhost we are using this endpoint to create a "success URL" after payment is sucessful
    // const frontend_url = "http://localhost:5174";
    //after deployment we use the "frontend link" provide by rended.com, as our current frontend_url
    const frontend_url = "https://frontend-5e9v.onrender.com";
 
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        //after succesfull order the cart will be blank
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}


//normally to verify payment we should use webhooks, but here we use a shortcut method
const verifyOrder = async (req,res)=>{
  const {orderId,success} = req.body;
  try {
    if (success === "true") {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"not paid"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }
}

//user orders for frontend
const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})//here within the find() method we create a filter that will find only the userId that is within the token which is req.body.userId

        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
    
}


//find all the order for all the user(for Admin panel)
const listOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export{placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
