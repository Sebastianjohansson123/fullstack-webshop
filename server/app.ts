import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { categoryRouter } from './resources/categories/category-router';
import { imageRouter } from './resources/images/image-router';
import { orderRouter } from './resources/orders/order-router';
import { productRouter } from './resources/products/product-router';
import { userRouter } from './resources/users/user-router';

export const app = express();
app.use(
  cookieSession({
    name: 'login',
    secure: false,
    httpOnly: true,
    secret: 'ashdasdhj123126tqsa',
    maxAge: 1000 * 60 * 20,
  })
);

app.use((req, res, next) => {
  console.log(req.method, req.path, req.params);
  next();
});
app.use(express.json());

// Routers
app.use(userRouter);
app.use(orderRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(imageRouter);

// Global error handling

// Error Handling --------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  res.status(404).json('The resource you are looking for does not exist');
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ValidationError) {
    res.status(400).json(err.message);
  }
  if (err instanceof Error) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json('Unknown server error');
  }
});
