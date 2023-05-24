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
  .get('/api/allproducts', getAllProducts)
  .get('/api/product/:id', getProductById)
  .get('/api/product/category/:name', getProductsByCategory)
  .put('/api/product/update/:id', updateProduct)
  .post('/api/product/add', addProduct)
  .delete('/api/product/delete/:id', deleteProduct);
