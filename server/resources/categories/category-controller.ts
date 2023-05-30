import { Request, Response } from 'express';
import { CategoryModel } from './category-model';

export async function getAllCategories(req: Request, res: Response) {
  const categories = await CategoryModel.find();
  res.json(categories);
};

export async function getCategoriesByName(req: Request, res: Response) {
  const category = await CategoryModel.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    return res.status(404).json({ error: 'Category not found!' });
  }
};