import { Request, Response } from 'express';
import { CategoryModel } from './category-model';

export async function createCategory(req: Request, res: Response) {
  const existingCategory = await CategoryModel.find(req.body)

  if (existingCategory) {
    res.status(401).json("that category already exists")
  }

  const newCategory = new CategoryModel(req.body)
  await newCategory.save()
  res.status(201).json('Category has been saved')
};

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