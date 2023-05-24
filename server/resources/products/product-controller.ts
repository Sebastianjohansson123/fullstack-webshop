import { Request, Response } from 'express';
import { array, number, object, string } from 'yup';
import { ProductModel } from './product-model';

export const ProductAddSchema = object({
  name: string().required(),
  price: number().required(),
  size: string().required(),
  color: string().required(),
  description: string(),
  details: array(),
  quantity: number().required(),
  category: array().required(),
  image: string(),
});

export async function getAllProducts(req: Request, res: Response) {}
export async function getProductById(req: Request, res: Response) {}

export async function addProduct(req: Request, res: Response) {
  await ProductAddSchema.validate(req.body);

  const newProduct = new ProductModel(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
}

export async function updateProduct(req: Request, res: Response) {}
export async function deleteProduct(req: Request, res: Response) {}
