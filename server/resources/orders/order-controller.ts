import { Request, Response } from 'express';
import { array, number, object } from 'yup';
import { ProductModel } from '../products/product-model';
import { OrderModel } from './order-model';

export async function getOrders(req: Request, res: Response) {}
export async function getOrdersByUserId(req: Request, res: Response) {}
export async function getOrderById(req: Request, res: Response) {}
export async function updateOrderById(req: Request, res: Response) {}

export async function createOrder(req: Request, res: Response) {
  console.log(req.session);
  // const { adress, orderRows, totalPrice } = req.body;
  // await orderAddSchema.validate(req.body);

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

// await ProductAddSchema.validate(req.body);

// const newProduct = new ProductModel(req.body);
// await newProduct.save();
// res.status(201).json(newProduct);

export const orderAddSchema = object({
  address: object(),
  orderRows: array(),
  totalPrice: number(),
});
