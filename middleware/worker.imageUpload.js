const multer = require("multer");

const workerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./workerProfileImage");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const workerUpload = multer({
  storage: workerStorage,
});

module.exports = workerUpload;
