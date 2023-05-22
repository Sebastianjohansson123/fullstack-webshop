import mongoose from 'mongoose';
import { app } from './app';

async function main() {
  mongoose.set('strictQuery', false); // Detta är för att få bort varningar i terminalen.app
  await mongoose.connect('mongodb+srv://admin:1IsBetPbWFXS98uJ@gentshatwebshop.c0bm92t.mongodb.net/');
  console.log('Connected to database');

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

main();
