const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creando modelo de la tabla
const usuarioSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  correo: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  password: {
    type: String,
    required: [true, "El password es necesario"],
  },
  img: { type: String, required: false },
  role: { type: String, required: true, default: "USER_ROLE" },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
