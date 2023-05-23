import busboy from 'busboy';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import { fileBucket } from './image-model';

export async function getImageById(req: Request, res: Response) {
  // logic to get an image by id
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
      });

    const resizer = sharp().resize(300).jpeg({ quality: 90 });

    file.pipe(resizer).pipe(uploadStream);
  });
}
