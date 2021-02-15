const Joi = require("joi");
// const { schema } = require("../../utils/bd");
const schemaId = Joi.number().integer().positive();

const messageNombre = {
  "any.required": "El campo nombre es obligatorio",
  "string.min": "El campo nombre debe tener al menos dos caracteres",
  "string.max": "El campo nombre no debe tener más de 30 caracteres",
};

const schemas = {
  create: Joi.object().keys({
    categoria: Joi.string().min(2).max(30).required().messages(messageNombre),
  }),

  modify: Joi.object().keys({
    categoria: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({ message: "El campo categoria es obligatorio" }),
  }),
};
module.exports = { schemas };
