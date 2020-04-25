const express = require("express");
const app = express();
const Usuario = require("../models/usuario");

// rutas
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

module.exports = app;
