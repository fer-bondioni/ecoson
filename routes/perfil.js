const express = require("express");
const router = express.Router();
const service = require("./../models/usuarios");

const getProfile = (req, res) =>
  service
    .get(req.params.id) //get(req.id)
    .then((r) => res.json(r))
    .catch((e) => res.status(500).json(e));
// console.log("entre al perfil");
// console.log("El id del usuario autenticado es", req.id);
//res.json({ message: "Welcome!" });
//traer noticias que pertenecen al usuario

router.get("/", getProfile);

module.exports = router;
