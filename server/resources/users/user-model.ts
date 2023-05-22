import argon2 from 'argon2';
import { InferSchemaType, Schema, model } from 'mongoose';
export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// This is a pre-hook that will be called before the `save` method
userSchema.pre('save', async function (next) {
  this.password = await argon2.hash(this.password);
  next();
});

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = model('User', userSchema);
