const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("itemImage");

module.exports = upload;
