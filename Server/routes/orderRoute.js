import express from 'express';
import { 
    allOrder, 
    placeOrder, 
    updateStatus, 
    userOrders 
} from '../controllers/orderControllers.js';

import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list', adminAuth, allOrder);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment features
orderRouter.post('/place', authUser, placeOrder);

// User feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
