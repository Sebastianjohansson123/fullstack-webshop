import argon2 from 'argon2';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { UserModel } from './user-model';

export const UserCreateSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    isAdmin: yup.boolean().notRequired(),
  })
  .noUnknown()
  .strict();

export async function registerUser(req: Request, res: Response) {
  const userBody = await UserCreateSchema.validate(req.body);

  if (!userBody) {
    return res.status(400).json('Invalid user data');
  }
  const existingUser = await UserModel.findOne({ username: userBody.username });
  if (existingUser) {
    return res.status(409).json('Username is already taken');
  }

  const newUser = new UserModel(req.body);
  const { password, ...userWithoutPass } = newUser.toObject();
  await newUser.save();
  res.status(201).json(userWithoutPass);
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
    _id: user?.id,
    username: user?.username,
    isAdmin: user?.isAdmin,
  };
  const { password: pass, ...rest } = user.toObject();
  res.status(200).json(rest);

  // res.status(200).json(user);
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
  console.log(req.session);
  if (!req.session?.username) {
    res.status(401).json(null);
  } else {
    res.status(200).json(req.session);
  }
}
