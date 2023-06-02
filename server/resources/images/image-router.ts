import express from 'express';
import { adminAuth } from '../../middlewares/adminAuth';
import { getImageById, uploadImage } from './image-controller';

export const imageRouter = express
  .Router()
  .get('/api/images/:id', getImageById)
  .post('/api/images', adminAuth, uploadImage);
