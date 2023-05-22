import { Request, Response } from 'express';

export async function registerUser(req: Request, res: Response) {}
export async function loginUser(req: Request, res: Response) {}
export async function logoutUser(req: Request, res: Response) {}
export async function getUserById(req: Request, res: Response) {}

export async function getUsers(req: Request, res: Response) {
  // Admin only
}
