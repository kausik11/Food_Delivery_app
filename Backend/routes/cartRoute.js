import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { addToCart,removeFromCart,getCart } from '../controllers/cartController.js';

 const cartRouter = express.Router();

//using this router we can create multiple endpoints

//when a user send an item_id through this endPoints then using the item_id we can add one entry in their cartData object where the "key" is "itemId" and the value is "count the occourance of the itemId"

//additionally when user send the data the should use the "token" to authenticate them, to decode this token we use middleware so we create a file "auth.js" within middleware folder
cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);
cartRouter.post('/get',authMiddleware,getCart);

export default cartRouter;