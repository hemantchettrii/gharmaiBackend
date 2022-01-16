const multer = require("multer");

const profileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./profileImage");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const profileUpload = multer({
  storage: profileStorage,
});

module.exports = profileUpload;
