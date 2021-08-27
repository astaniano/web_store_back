import { Injectable } from '@nestjs/common';
import * as Jimp from 'jimp';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  async cropImage(img: Buffer, newWidth: number, newHeight: number) {
    const image = await Jimp.read(img);
    const originalHeight = image.getHeight();
    const originalWidth = image.getWidth();

    let h = originalHeight;
    let w = originalWidth;
    let x = 0;
    let y = 0;
    if (originalWidth > newWidth) {
      x = (originalWidth - newWidth) / 2;
      w = newWidth;
    }
    if (originalHeight > newHeight) {
      y = (originalHeight - newHeight) / 2;
      h = newHeight;
    }

    await image.crop(x, y, w, h);
    return await image.getBufferAsync(image.getMIME());
  }

  async saveImageInFs(img: Buffer, relativeImagePath: string) {
    const image = await Jimp.read(img);
    const mime = image.getMIME(); // return example: 'image/jpeg' OR 'image/png'
    const imgExtension = mime.slice(mime.indexOf('/') + 1); // image/png => png
    await image.writeAsync(`${relativeImagePath}.${imgExtension}`);
  }

  findImageInFolder(absolutePathToPhotosFolder: string, userId: number) {
    return new Promise((res) => {
      fs.readdir(absolutePathToPhotosFolder, (err, files: string[]) => {
        const regexForUserPhoto = new RegExp(userId + '.*');
        const userPhotoName = files.find((file: string) => {
          return regexForUserPhoto.test(file);
        });
        res(userPhotoName);
      });
    });
  }

  getImage(imgPath: string) {
    return fs.createReadStream(imgPath);
  }
}
