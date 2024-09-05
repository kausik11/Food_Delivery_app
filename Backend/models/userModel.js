import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})//this minimize with the value "false" is given because for the "cartData" key we are passing a blank object by default, as because it is blank there will be problem while we use this schema, using "minimize:false" a blank object will save in the database 

const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel;