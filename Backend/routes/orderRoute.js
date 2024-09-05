import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";
import express from 'express';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders',authMiddleware,userOrders);
orderRouter.get('/list',listOrders); //this endpoints for admin panel for all orders for all user
orderRouter.post('/status',updateStatus);

//here the authMiddleware function extract the userId from the token passed to this middleware function

export default orderRouter;