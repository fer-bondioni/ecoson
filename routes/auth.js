const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const sha1 = require("sha1");
const privateKey = fs.readFileSync("./keys/private.pem");
const signOptions = { algorithm: "RS256", expiresIn: "2h" };
const { authenticate } = require("./../models/auth");
// const { create } = require("../models/personas");

const createToken = (payload) => jwt.sign(payload, privateKey, signOptions);
const auth = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const [user] = await authenticate(usuario, sha1(password)); //[] || [{}]
    console.log(user);
    if (!user) res.sendStatus(401);
    if (!user.habilitado)
      //res.sendStatus(401);
      res.status(401).json({ message: "Confirmá tu cuenta para seguir" });
    if (user.habilitado) {
      const token = createToken({ id: user.id });
      res.json({ JWT: token, info: { usuario } }); //info dato publico, JWT dt privado
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

router.post("/", auth);

module.exports = router;
