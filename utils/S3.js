const fs = require("fs");
const AWS = require("aws-sdk");

const S3 = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: "",
});

const upload = async (file, mimetype) => {
  try {
    const body = fs.readFileSync(`./public/images/${file}`); //file es el unique id
    const params = {
      Bucket: "imagesdocentes",
      Key: `images_noticias/${file}`,
      Body: body,
      ContentType: mimetype,
      ACL: "public-read",
    };
    S3.putObject(params, (err, response) => {
      if (err) throw err;
    });
    return fs.unlinkSync(`./public/images/${file}`, (e) => {
      console.log(e);
      //fs.unlink(`./public/images/${file}`, (e) => {
      //throw e;
    });
  } catch (e) {
    throw e;
  }

  // leer el temporal
  // subir ese archivo a aws
};

module.exports = { upload };
