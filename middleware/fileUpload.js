const multer = require("multer");

// where to store our file...
const storage = multer.diskStorage({
  //where and with what name
  destination: function (req, file, cb) {
    cb(null, "./movies"); //where files is foldername
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;