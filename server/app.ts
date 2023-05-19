import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import { orderRouter } from './resources/orders/order-router';
import { userRouter } from './resources/users/user.routes';

export const app = express();

app.use(express.json());

app.use(
  cookieSession({
    name: 'login',
    secure: false,
    httpOnly: true,
    secret: 'ashdasdhj123126tqsa',
    maxAge: 1000 * 60 * 20,
  })
);

// Routers
app.use('api/user', userRouter);
app.use('api/order', orderRouter);

// Global error handling

// Error Handling --------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  res.status(401).json('The resource you are looking for does not exist');
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // if (err instanceof ValidationError) {
  //   res.status(400).json(err.message); }
  if (err instanceof Error) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json('Unknown server error');
  }
});
