import { InferSchemaType, Schema, model } from 'mongoose';

export const addressSchema = new Schema({
  fullName: String,
  address: String,
  zipCode: Number,
  city: String,
  email: String,
  phoneNumber: Number,
});

export const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orderRows: [],
  totalPrice: Number,
  address: addressSchema,
  Sent: {
    type: Boolean,
    default: false,
  },
});

export type Order = InferSchemaType<typeof orderSchema>;
export const OrderModel = model('Order', orderSchema);
