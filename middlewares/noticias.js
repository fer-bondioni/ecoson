const { schemas } = require("./schemas/noticias");

const validateCreate = (req, res, next) => {
  const { error, value } = schemas.create.validate(req.body);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};

const validateModify = (req, res, next) => {
  const obj = {
    ...req.params,
    ...req.body,
  };
  const { error, value } = schemas.modify.validate(obj);
  error ? res.status(422).json({ error: error.details[0].message }) : next();
};

module.exports = { validateCreate, validateModify };
