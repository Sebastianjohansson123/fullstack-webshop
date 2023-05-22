import { Request, Response } from 'express';

export async function getAllCategories(req: Request, res: Response) {
  return console.log('Get all Categories');
}

export async function getCategoriesById(req: Request, res: Response) {
  return console.log('Retrieving category by ID');
}
