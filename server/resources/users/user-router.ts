import express from 'express';
import { adminAuth } from '../../middlewares/adminAuth';
import {
  getOwnUserInfo,
  getUserById,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateToAdmin,
} from './user-controller';

export const userRouter = express
  .Router()
  .get('/api/users', adminAuth, getUsers)
  .get('/api/users/self', getOwnUserInfo)
  .get('/api/users/:id', adminAuth, getUserById)
  .post('/api/users/register', registerUser)
  .post('/api/users/login', loginUser)
  .post('/api/users/logout', logoutUser)
  .put('/api/users/updatetoadmin/:id', adminAuth, updateToAdmin);
