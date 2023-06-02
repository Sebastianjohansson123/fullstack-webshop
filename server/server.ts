import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';

//För att koppla er ti db compass kopiera detta mongodb+srv://admin:1IsBetPbWFXS98uJ@gentshatwebshop.c0bm92t.mongodb.net/

dotenv.config();

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI env variable');
  }
  mongoose.set('strictQuery', false); // Detta är för att få bort varningar i terminalen.app
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to database');

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

main();
