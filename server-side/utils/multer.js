const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    let valid = [".webp", ".png", ".jpg", ".jpeg"];
    if (!valid.includes(ext)) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
