const Joi = require("joi");
const messageNombre = {
  "any.required": "El campo titulo es obligatorio",
  "string.min": "El campo titulo debe tener al menos 10 caracteres",
  "string.max": "El campo titulo no debe superar 200 caracteres",
};

const schemas = {
  create: Joi.object().keys({
    titulo: Joi.string().min(5).max(200).required().messages(messageNombre),
    texto: Joi.string().min(5).max(20000).required(),
    idCategoria: Joi.number().integer().positive().required(),
    idUsuario: Joi.number().integer().positive().required(),
  }),

  modify: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    titulo: Joi.string().min(5).max(20000).optional(),
    texto: Joi.string().optional(),
    idCategoria: Joi.number().integer().positive().optional(),
  }),
};

module.exports = { schemas };
