import { Request, Response } from 'express';
import { array, number, object } from 'yup';
import { ProductModel } from '../products/product-model';
import { OrderModel } from './order-model';

export async function getOrders(req: Request, res: Response) {}
export async function getOrdersByUserId(req: Request, res: Response) {}
export async function getOrderById(req: Request, res: Response) {}
export async function updateOrderById(req: Request, res: Response) {}

export async function createOrder(req: Request, res: Response) {
  // Validate the order
  await orderAddSchema.validate(req.body);

  // Create the order and save it
  const newOrder = new OrderModel({ ...req.body, user: req.session?._id });
  const savedPost = await newOrder.save();

  // Change the stock of the products
  const orderRows = req.body.orderRows;
  for (const row of orderRows) {
    const product = await ProductModel.findOneAndUpdate(
      { _id: row.productId },
      { $inc: { inStock: -row.quantity } }
    );
    if (!product) {
      throw new Error('Product not found');
    }
    await product.save();
  }

  res.status(201).json(savedPost);
}

export async function getProductsByCategory(req: Request, res: Response) {}
export async function addProduct(req: Request, res: Response) {}

export async function updateProduct(req: Request, res: Response) {
  // Validate the order
  await orderAddSchema.validate(req.body);

  const product = await ProductModel.findOne({ _id: req.body.id });
  await product?.updateOne({ $set: req.body });
}
export const orderAddSchema = object({
  address: object(),
  orderRows: array(),
  totalPrice: number(),
});
