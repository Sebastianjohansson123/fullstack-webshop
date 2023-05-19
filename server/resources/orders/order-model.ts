import { Schema } from 'mongoose';

export const addressSchema = new Schema({
  fullName: String,
  address: String,
  zipCode: Number,
  city: String,
  email: String,
  phoneNumber: Number,
});

export const orderSchema = new Schema({
  orderRows: [],
  totalPrice: Number,
  adress: addressSchema,
  isDeleted: Boolean,
  status: String,
});
