import express from 'express';
import { adminAuth } from '../../middlewares/adminAuth';
import { auth } from '../../middlewares/userAuth';
import {
  createOrder,
  getOrderById,
  getOrders,
  getOrdersByUserId,
  updateOrderById,
} from './order-controller';

export const orderRouter = express
  .Router()
  .get('/api/orders', adminAuth, getOrders)
  .post('/api/orders/create', createOrder) // auth
  .get('/api/orders/user/:userid', auth, getOrdersByUserId)
  .get('/api/orders/:id', adminAuth, getOrderById)
  .put('/api/orders/:id', adminAuth, updateOrderById);
