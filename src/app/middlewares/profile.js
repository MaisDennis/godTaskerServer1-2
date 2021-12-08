// import { profileImgUpload } from '../middlewares/profile';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
// -----------------------------------------------------------------------------

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_BUCKET,
});

function checkFileType(file, cb) {
  // Allowed ext

  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb('Error: Images Only!');
}

const profileImgUpload = multer({
  storage: multerS3({
    s3,
    bucket: 'godtaskerfiles',
    acl: 'public-read',
    key(req, file, cb) {
      cb(
        null,
        `${path.basename(
          file.originalname,
          path.extname(file.originalname)
        )}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('profileImage');

export default profileImgUpload;
