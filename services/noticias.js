const {
  create,
  createImages,
  createCategoria,
} = require("./../models/noticias");
const { imgFile } = require("./../utils/fileHandler");
const { upload } = require("./../utils/S3");

const createNoticia = async (bodyObj, fileObj) => {
  try {
    //const [id] = await create(bodyObj);
    // const cat = {
    //   id,
    //   categoria,
    // };
    const [idNoticia] = await create(bodyObj);
    //const [idCategoria] = await createCategoria(bodyObj);

    const uid = imgFile(fileObj);
    console.log("Uid de imagen : ", uid);

    const obj = {
      idNoticia,
      uid,
    };

    const [type, extension] = fileObj.mimetype.split("/");
    const file = `${uid}.${extension}`;

    const [idImagen] = await createImages(obj);

    return upload(file, fileObj.mimetype);
  } catch (e) {
    throw e;
  }
};

module.exports = { createNoticia };

// const createNoticia = async (bodyObj, files) => {
//   try {
//     const [idNoticia] = await create(bodyObj);
//     const results = files.map((file) => {
//       const uid = imgFile(files);

//       const obj = {
//         idNoticia,
//         uid,
//       };

//       const [type, extension] = fileObj.mimetype.split("/");
//       const fil = `${uid}.${extension}`;

//       createImages(obj);

//       upload(fil, fileObj.mimetype);
//     });
//     return await Promise.all(results);
//   } catch (e) {
//     throw e;
//   }
// };

// module.exports = { createNoticia };

// const createNoticia = async (body, files) => {
//   try {
//     const [idNoticia] = await create(body);
//     const results = files.map((file) => {
//       const uid = imgFile(files);
//       const obj = {
//         idNoticia,
//         uid,
//       };
//       createImages(obj);
//     });
//     return await Promise.all(results);
//   } catch (e) {
//     throw e;
//   }
// };

//const [type, extension] = files.mimetype.split("/");
//const files = `${uid}.${extension}`;
//upload(file, files.mimetype);

// const createNoticia = async (body, files) => {
//   try {
//     const [idNoticia] = await create(body);
//     const results = files.map((file) => {
//       const uid = imgFile(files);
//       const obj = {
//         idNoticia,
//         uid,
//       };
//       const [idImagen] = createImages(obj); // [10]
//     });
//     return idImagen;
//     return upload(file, files.mimetype);
//   } catch (e) {
//     throw e;
//   }
// };
