import { Request, Response } from 'express';
import { array, number, object, string } from 'yup';
import { ProductModel } from './product-model';

export const ProductAddSchema = object({
  name: string(),
  price: number(),
  size: string(),
  color: string(),
  description: string(),
  details: array(),
  quantity: number(),
  category: array(),
  image: string(),
});

export async function getAllProducts(req: Request, res: Response) {
  const allProducts = await ProductModel.find();
  res.status(200).json(allProducts);
}

export async function getProductsByCategory(req: Request, res: Response) {
  const products = await ProductModel.find({ name: req.params.id });
}

export async function getProductById(req: Request, res: Response) {}

export async function addProduct(req: Request, res: Response) {
  await ProductAddSchema.validate(req.body);

  const newProduct = new ProductModel(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
}

export async function updateProduct(req: Request, res: Response) {
  const oldProduct = await ProductModel.findById(req.params.id);
  if (!oldProduct) {
    return res.status(404).json('Product not found');
  }
  await oldProduct.updateOne({ $set: req.body }, { new: true });
  const updatedPost = await ProductModel.findById(req.params.id);
  res.status(200).json(updatedPost);
}
export async function deleteProduct(req: Request, res: Response) {}
