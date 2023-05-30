import { InferSchemaType, Schema, model } from 'mongoose';

export const categorySchema = new Schema({
  name: { type: String, required: true },
});

export type Category = InferSchemaType<typeof categorySchema>;
export const CategoryModel = model<Category>('Category', categorySchema);