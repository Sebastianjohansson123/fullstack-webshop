import { InferSchemaType, Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: String,
    description: String,
    details: [],
    quantity: Number,
    price: Number,
    category: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type Product = InferSchemaType<typeof productSchema>;
export const ProductModel = model('Product', productSchema);
