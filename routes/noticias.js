const express = require("express");
const router = express.Router();
const multer = require("multer");
const config = { dest: "./public/tmp" };
const upload = multer(config);
const service = require("./../models/noticias");
const { validateCreate, validateModify } = require("./../middlewares/noticias");
const service2 = require("./../services/noticias");
const all = (req, res) =>
  service
    .all()
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json(e));

const single = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await service.single(id);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
};

const create = (req, res) => {
  try {
    const result = service2.createNoticia(req.body, req.file);
    res.json({ result });
  } catch (e) {
    res.sendStatus(500);
  }
  console.log(req.body, req.file);
};

// service2
//   .createNoticia(req.body, req.file)
//   .then((response) => res.json(response))
//   .catch((e) => res.status(500).json(e));

const modify = (req, res) => {
  service
    .modify(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((error) => res.status(500).json(error));
  console.log(req.body, req.params.id);
};

// const categoria = (req, res) => {
//   service
//     .categorias()
//     .then((response) => res.json(response))
//     .catch((e) => res.status(500).json(e));
//   console.log(req, res);
// };

const categoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const result = await service.categorias(categoria);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
  console.log(req.params, req);
};

router.get("/all", all);
router.get("/single/:id", single);
router.get("/categoria/:categoria", categoria);
router.post("/create", upload.single("imagen"), create);
router.put("/modify/:id", validateModify, modify);

module.exports = router;
