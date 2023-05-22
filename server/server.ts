import mongoose from 'mongoose';
import { app } from './app';

async function main() {
  mongoose.set('strictQuery', false); // Detta är för att få bort varningar i terminalen.app
  await mongoose.connect('mongodb://127.0.0.1:27017/GentsShop');
  console.log('Connected to database');

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

main();
