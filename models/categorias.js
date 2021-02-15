const bd = require("./../utils/bd");

const getAll = () => bd("categorias").where({ habilitado: 1 }).select("*");

const modify = (id, obj) => bd("categorias").where({ id }).update(obj);

const create = (obj) => bd("categorias").insert(obj);

module.exports = { getAll, create, modify };
