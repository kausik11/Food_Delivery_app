import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";



//a function to create a token that will use at the time of user registration
const createToken = (id)=>{ //this id is self generated in the mongodb _id
    return jwt.sign({id},process.env.JWT_SECRET);
  }

//register user
const registerUser = async(req,res)=>{
     //first we have to destructure the name,email and password from request body
   const{name,password,email}=req.body;
   try {
    //we have to check if the user already exists in the database
    const exists = await userModel.findOne({email});
    if (exists){
        return res.json({success:false,message:"User already exists."})
    }

     // validating email format & strong password
     if (!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email."})
    }

    if (password.length<8){
        return res.json({success:false,message:"Please enter a strong password."})
    }

     // hashing user password
     const salt = await bcrypt.genSalt(10)////the number should be 5 to 15, the higher number we use make the password more stronger while encrypt

      //after that we will create encrypted password using this salt
     const hashedPassword = await bcrypt.hash(password,salt);

       //after that we will create a new user using the user schema after the all operations above
     const newUser = new userModel({
         name:name,
         email:email,
         password:hashedPassword
     })

       //now it stores the user into database
    //and to differntiate the user from any other user we are going to save this within "user" variable
     const user = await newUser.save()
     //after that we will take the user id from database and generate a token, the token includes the user._id and random text generate by jwt

     const token = createToken(user._id)
     res.json({success:true,token});


   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}

//Login User
const loginUser = async(req,res)=>{

    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {  //if there is not a user we looking for this if will executed
           return  res.json({success:false,message:"User doesn't exist"})
        }

        //then we match the password that we are getting from req.body and the password stored in database that we are getting using user.password
        const isMatch = password.length>0 ? await bcrypt.compare(password,user.password) : false;
        if (!isMatch) {
           return res.json({success:false,message:"Password is not matched"})
        }

        //if the password and email id matched we will create a token
        const token = createToken(user._id);
        //and next we send the token as response
       return res.json({success:true,message:"Login Success",token:token})
    
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
   
}

export {registerUser,loginUser};