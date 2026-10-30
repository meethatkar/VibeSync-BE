const Mutler = require("multer");

const storage = Mutler.memoryStorage();

const uploadeFiles = Mutler({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

module.exports = uploadeFiles;
