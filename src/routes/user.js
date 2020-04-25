const express = require("express");
const app = express();
const Usuario = require("../models/usuario");

// rutas
// ===============================
//obtener todos los usuarios
// ===============================

app.get("/", (req, res, next) => {
  //condicionando la consulta
  Usuario.find({}, "nombre email img role").exec((err, usuarios) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error en base de datos",
        errors: err,
      });
    }
    res.status(200).json({
      ok: true,
      usuarios: usuarios,
    });
  });
});
// ===============================
//crear nuevo usuario
// ===============================
app.post("/", (req, res, next) => {});

module.exports = app;
