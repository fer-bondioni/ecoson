const bd = require("../utils/bd");

const authenticate = (usuario, password) =>
  bd("usuarios")
    .where({ usuario, password })
    // .andWhere("habilitado", true)
    .select("id", "usuario", "habilitado");

module.exports = { authenticate };
