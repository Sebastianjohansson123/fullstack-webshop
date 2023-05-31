import express from 'express';
import {
  getAllCategories,
  getCategoriesByName,
  createCategory,
} from './category-controller';

export const categoryRouter = express
  .Router()
  .post('/api/categories/create', createCategory) // adminAuth
  .get('/api/categories/:id', getCategoriesByName)
  .get('/api/categories', getAllCategories);
