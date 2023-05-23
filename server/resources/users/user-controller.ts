import { Request, Response } from 'express';
import * as yup from 'yup';
import { UserModel } from './user-model';

export async function registerUser(req: Request, res: Response) {
  const { username, password } = req.body;

  // Checks for missing or incorrect values
  const userSchema = yup.object().shape({
    username: yup.string().strict().required(),
    password: yup.string().strict().required(),
  });

  const result = userSchema.validate(req.body);

  if (result instanceof yup.ValidationError) {
    res.status(400).json(result.errors);
    return;
  }

  //Checking username to existing one
  const existingUser = await UserModel.findOne({
    username,
  });
  if (existingUser) {
    res.status(409).json('This username is taken. Please chose another one');
    return;
  }

  const user = {
    username,
    password,
  };
  const newUser = await UserModel.create(user);

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    isAdmin: newUser.isAdmin,
  });
}

export async function loginUser(req: Request, res: Response) {}
export async function logoutUser(req: Request, res: Response) {}
export async function getUserById(req: Request, res: Response) {}

export async function getUsers(req: Request, res: Response) {
  // Admin only
}
