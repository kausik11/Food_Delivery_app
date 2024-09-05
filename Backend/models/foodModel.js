import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

//using the above schema here we create the model
// const Food = mongoose.model("Food",foodSchema);
//we can create a model only once but when we run this file again it will create the model again, to solve this problem we are using "or" operator 
//if the model is already there in database, if it not there it will create a new model
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;