import express from 'express';
import { auth } from '../../middlewares/userAuth';
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
  .get('/api/users', auth, getUsers)
  .get('/api/users/self', getOwnUserInfo)
  .get('/api/users/:id', auth, getUserById)
  .post('/api/users/register', registerUser)
  .post('/api/users/login', loginUser)
  .post('/api/users/logout', logoutUser)
  .put('/api/users/updatetoadmin/:id', updateToAdmin);
