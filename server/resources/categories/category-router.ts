import express from 'express';
import { getAllCategories, getCategoriesByName } from './category-controller';

export const categoryRouter = express
  .Router()
  .get('/api/categories', getAllCategories)
  .get('/api/categories/:id', getCategoriesByName);
