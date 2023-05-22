import mongoose from 'mongoose';

export let fileBucket: mongoose.mongo.GridFSBucket;

// Skapa bucket'en först efter att mongoose har kopplat upp sig mot databasen
mongoose.connection.on('open', () => {
  fileBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'images',
  });
});
