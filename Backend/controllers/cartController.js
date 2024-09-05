import userModel from "../models/userModel.js"

// add items to user cartData object in database
const addToCart = async (req,res) => {
    try {
        //to find a specific user cartData, we find with the userId
        // let userData = await userModel.findById(req.body.userId); //or we can write as well
        let userData = await userModel.findById({_id:req.body.userId}); //so here the condition is "while finding the user the "userId" should same with the "req.body.userId" that we will get using the middleware"

        //here we extract the cartData object from userData
        let cartData = await userData.cartData;

        //after that we are going to modify the cartData, so when user are going to add data within cart then they will sent the token and also they will sent the itemId
        if (!cartData[req.body.itemId])//if cart has no entry with the itemId then create a entry
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        //after that we will update the cartData with the "new cartData"
        //here we sending the "userId" and the new "cartData" as a object
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,getCart}