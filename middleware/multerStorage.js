import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage/images");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uuidv4() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
  cb(null, allowedMimeTypes.includes(file.mimetype));
};
export default multer({ storage: fileStorage, fileFilter: fileFilter }).single("thumbnail");
