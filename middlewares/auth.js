const fs = require("fs");
const publicKey = fs.readFileSync("./keys/public.pem");
const jwt = require("jsonwebtoken");

const secured = (req, res, next) => {
  try {
    //req.headers.authorization => JWT
    const { authorization } = req.headers;
    const { id } = jwt.verify(authorization, publicKey);
    req.id = id;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
};

module.exports = { secured };
