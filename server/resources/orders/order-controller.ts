import { Request, Response } from 'express';
import { array, number, object } from 'yup';
import { ProductModel } from '../products/product-model';
import { OrderModel } from './order-model';

export async function getOrders(req: Request, res: Response) {
  const orders = await OrderModel.find();
  res.status(200).json(orders);
}
export async function getOrdersByUserId(req: Request, res: Response) {
  const orders = await OrderModel.find({ user: req.session?._id });
  if (!orders) {
    res.status(404).json('No orders found');
  }
  res.status(200).json(orders);
}

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

export async function updateOrderById(req: Request, res: Response) {
  const oldOrder = await OrderModel.findById(req.params.id);
  if (!oldOrder) {
    return res.status(404).json('Order not found');
  }
  // set the value of the order Sent to true
  await oldOrder.updateOne({ $set: { Sent: true } }, { new: true });
  const updatedOrder = await OrderModel.findById(req.params.id);
  res.status(200).json(updatedOrder);
}

export const orderAddSchema = object({
  address: object(),
  orderRows: array(),
  totalPrice: number(),
});
