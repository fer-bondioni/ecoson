const bd = require("../utils/bd");
const { v4: uuid } = require("uuid");
const sha1 = require("sha1");
const { send } = require("./mail");
const create = async (obj) => {
  try {
    const { nombre, apellido, mail } = obj;
    const { usuario, password } = obj;

    const persona = { nombre, apellido, mail };
    const [idPersona] = await bd("personas").insert(persona); // [4]
    const user = {
      usuario,
      password: sha1(password),
      idPersona,
      confirmacionCorreo: uuid(),
    };

    const [idUsuario] = await bd("usuarios").insert(user);
    // return idUsuario;
    // envie un mail

    const url = `${process.env.URL_CONFIRM}${user.confirmacionCorreo}`;

    const messageId = await send({
      to: mail,
      subject: "Gracias por registrate",
      html: `Envio de link unico para validar cuenta: <a href="${url}">${url}</a>`,
    });

    return messageId;
  } catch (e) {
    console.log(e);
  }
};
module.exports = { create };
