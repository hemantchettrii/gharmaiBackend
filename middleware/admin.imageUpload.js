const multer = require("multer");

const adminStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./adminProfileImage");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const adminUpload = multer({
  storage: adminStorage,
});

module.exports = adminUpload;
