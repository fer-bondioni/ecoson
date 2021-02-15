const { orderByRaw } = require("./../utils/bd");
const bd = require("./../utils/bd");
const T = require("./../utils/schemas");
const get = (conditions = true) =>
  bd(`${T.NOTICIAS} as N`)
    .join(`${T.CATEGORIAS} as C`, "N.idCategoria", "C.id")
    .join(`${T.USUARIOS} as U`, "N.idUsuario", "U.id")
    .join(`${T.NIMAGENES} as I`, "I.idNoticia", "N.id")
    .where({ "N.habilitado": true, ...conditions })
    .select(
      "titulo",
      "texto",
      "C.categoria as categoria",
      "N.idUsuario",
      "N.id",
      "I.uid",
      "N.ts_create as fecha"
    );

const ultimas = (conditions = true) =>
  bd(`${T.NOTICIAS} as N`)
    .join(`${T.CATEGORIAS} as C`, "N.idCategoria", "C.id")
    .join(`${T.USUARIOS} as U`, "N.idUsuario", "U.id")
    .join(`${T.NIMAGENES} as I`, "I.idNoticia", "N.id")
    .where({ "N.habilitado": true, ...conditions })
    .limit(3)
    .orderBy("N.ts_create", "desc")
    .select(
      "titulo",
      "texto",
      "C.categoria as categoria",
      "N.idUsuario",
      "N.id",
      "I.uid",
      "N.ts_create as fecha"
    );

const categorias = (categoria) => get({ "C.categoria": categoria });

const single = (id) => get({ "N.id": id });

const all = () => get();

const modify = (id, obj) => bd("noticias").where({ id }).update(obj);

const create = (obj) => bd("noticias").insert(obj);

const createImages = (obj) => bd("noticia_imagenes").insert(obj);

const createCategoria = (obj) => bd("categorias").insert(obj);

module.exports = {
  create,
  createImages,
  all,
  single,
  modify,
  createCategoria,
  categorias,
  ultimas,
};
