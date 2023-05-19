import { Schema } from 'mongoose';

const productSchema = new Schema({
  name: String,
  description: String,
  details: [],
  quantity: Number,
  price: Number,
  category: String,
});
