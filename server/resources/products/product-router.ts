import express from 'express';
import { getProductsByCategory } from '../orders/order-controller';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from './product-controller';

export const productRouter = express
  .Router()
  .get('/api/product', getAllProducts)
  .get('/api/product/category/:name', getProductsByCategory)
  .put('/api/product/update/:id', updateProduct)
  .get('/api/product/:id', getProductById)
  .post('/api/product/add', addProduct)
  .delete('/api/product/delete/:id', deleteProduct);
