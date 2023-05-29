import busboy from 'busboy';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import { fileBucket } from './image-model';

export async function getImageById(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await fileBucket.find({ _id }).next();
  if (!file) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.set('Content-Type', file.contentType);
  const downloadStream = fileBucket.openDownloadStream(_id);
  downloadStream.pipe(res);
}
export async function uploadImage(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  req.pipe(bb);

  bb.on('file', (_, file, info) => {
    const { filename, mimeType } = info;

    const uploadStream = fileBucket
      .openUploadStream(filename, { contentType: mimeType })
      .on('finish', (data: mongoose.mongo.GridFSFile) => {
        res.status(201).json(data._id);
        console.log('image id is: ', data._id);
      });

    const resizer = sharp().resize(300).png({ quality: 100 });

    file.pipe(resizer).pipe(uploadStream);
  });
}
