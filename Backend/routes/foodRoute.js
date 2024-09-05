import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";//multer is used for image processing

//here we create the Router
const foodRoute = express.Router();

//and using this Router we can create post,get and many other methods.
// foodRoute.post('/add',addFood);

//image stroge engine
//using this logic the image that is upload by the user will store in "uploads" folder
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,acallbackFunc)=>{
        return acallbackFunc(null,`${Date.now()}${file.originalname}`)
    }
})

//now we can use the storage configuration 
const upload = multer({storage:storage}) //now on the below route we use the middleware

//and using this Router we can create post,get and many other methods.
foodRoute.post('/add',upload.single("image"),addFood);

//using this Router we can lists all food items
foodRoute.get('/list',listFood);

//using this Route we can delete a foodItem using food._id
foodRoute.post('/remove',removeFood);




export default foodRoute;