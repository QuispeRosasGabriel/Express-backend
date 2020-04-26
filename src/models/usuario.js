const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol valido",
};

//Creando modelo de la tabla
const usuarioSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  email: {
    type: String,
    unique: true,
    required: [true, "El mail es necesario"],
  },
  password: {
    type: String,
    required: [true, "El password es necesario"],
  },
  img: { type: String, required: false },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    enum: rolesValidos,
  },
});

usuarioSchema.plugin(uniqueValidator, {
  message: "{PATH} El correo debe ser único",
});

module.exports = mongoose.model("Usuario", usuarioSchema);
