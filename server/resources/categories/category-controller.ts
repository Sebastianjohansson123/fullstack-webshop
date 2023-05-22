import { Request, Response } from 'express';

export async function getAllCategories(req: Request, res: Response) {
  console.log('Get all Categories');
}

export async function getCategoriesByName(req: Request, res: Response) {
  console.log('Retrieving category by name');
}
