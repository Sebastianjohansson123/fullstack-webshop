import argon2 from 'argon2';
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
    res.status(409).json('Användarnamnet är upptaget. Vänligen välj ett annat');
    return;
  }

  const user = {
    username,
    password,
  };

  const newUser = await UserModel.create(user);

  res.status(201).json('Account Created');
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    username,
  });

  if (!user) {
    res.status(401).json('Incorrect username or password');
    return;
  }
  const isAuth = await argon2.verify(user.password, password);
  if (!isAuth) {
    res.status(401).json('Incorrect username or password');
    return;
  }

  req.session! = {
    username: user?.username,
    isAdmin: false,
  };

  // req.session!.username = user.username;
  // req.session!._id = user._id;
  // req.session!.isAdmin = user.isAdmin;

  res.status(200).json({
    // _id: user!._id,
    username: user!.username,
    isAdmin: user!.isAdmin,
  });
}

export async function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.sendStatus(204);
}

export async function getUserById(req: Request, res: Response) {}

export async function getUsers(req: Request, res: Response) {
  // Admin only
}

export async function getOwnUserInfo(req: Request, res: Response) {
  res.status(200).json(req.session!);
}
