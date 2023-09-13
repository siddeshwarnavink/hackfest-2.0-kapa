import { diskStorage } from 'multer';
import { extname } from 'path';

const UPLOAD_FOLDER = 'uploads/';

export const uploadOptions = {
  storage: diskStorage({
    destination: './' + UPLOAD_FOLDER,
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};