import { InferSchemaType, Schema, SchemaTypes, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    size: String,
    color: String,
    description: String,
    details: [],
    inStock: Number,
    category: [],
    image: {
      type: SchemaTypes.ObjectId,
      // ref: 'Image',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type Product = InferSchemaType<typeof productSchema>;
export const ProductModel = model('Product', productSchema);
