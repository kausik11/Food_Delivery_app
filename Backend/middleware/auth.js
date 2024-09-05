import jwt from 'jsonwebtoken';


//this function will take req,res and a callback function named as ('next')
//this middleware will take the token and converted into the userId and using the userId we can add,remove or get the data from the cart
const authMiddleware = async(req,res,next)=>{
     //first we take the token by destructure it from the user using the header
     const {token} = req.headers;
     // console.log(token);
     //after that we checked whether we get the token or not
     if (!token) {
        return res.json({success:false, message:"Not authorized Login again"})
    }
    try {
        //if the token is available then we try to decode the token
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);  
        //now we store the "userId" from the decoded token, at the request.body.userId parameters, and pass the "userId" to controller function "cartController.js"
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'error'});
    }
     
}
export default authMiddleware;
//we connect this function to cartRoute.js