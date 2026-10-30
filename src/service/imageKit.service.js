const ImageKit = require("@imagekit/nodejs").default;
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_KEY, // This is the default and can be omitted
});

const uploadFile = async (buffer, fileName, folderName) => {
  const response = await client.files.upload({
    file: await toFile(Buffer.from(buffer)),
    fileName: fileName,
    folder: "cohort-moodify-" + folderName,
  });

  return response;
};

module.exports = {
  uploadFile,
};
