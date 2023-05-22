import { Request, Response } from 'express';
import { ProductModel } from './product-model';

export async function getAllProducts(req: Request, res: Response) {}
export async function getProductById(req: Request, res: Response) {}

export async function addProduct(req: Request, res: Response) {
  const newProduct = new ProductModel(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
}

export async function updateProduct(req: Request, res: Response) {}
export async function deleteProduct(req: Request, res: Response) {}
