const express = require("express");
const router = express.Router();
const service = require("./../models/noticias");
const todas = (req, res) =>
  service
    .ultimas()
    .then((response) => res.json(response))
    .catch((e) => res.status(500).json(e));

router.get("/home", todas);

module.exports = router;
