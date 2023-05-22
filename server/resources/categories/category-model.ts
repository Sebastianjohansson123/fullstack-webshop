import { InferSchemaType, Schema } from 'mongoose';

export const categorySchema = new Schema({
  name: { type: String, required: true },
});

export type Category = InferSchemaType<typeof categorySchema>;
