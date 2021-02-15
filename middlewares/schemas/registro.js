const Joi = require("joi");
// nombre,apellido,mail, telefono, usuario,password
const schemas = {
  create: Joi.object().keys({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    mail: Joi.string().email({ minDomainSegments: 2 }),
    usuario: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,20}$/),
  }),
};

module.exports = { schemas };
