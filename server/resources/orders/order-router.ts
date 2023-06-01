import express from 'express';
import { adminAuth } from '../../middlewares/adminAuth';
import { auth } from '../../middlewares/userAuth';
import {
  createOrder,
  getOrders,
  getOrdersByUserId,
  updateOrderById,
} from './order-controller';

export const orderRouter = express
  .Router()
  .get('/api/orders', adminAuth, getOrders)
  .post('/api/orders/create', createOrder) // auth
  .get('/api/orders/user/:userid', auth, getOrdersByUserId)
  .put('/api/orders/:id', updateOrderById); // adminAuth
