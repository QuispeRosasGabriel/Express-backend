const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const app = express();

app.post("/", (req, res) => {
  var body = req.body;

  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar usuario",
        errors: err,
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        mensaje: "Crecenciales incorrectas",
        errors: err,
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        mensaje: "Crecenciales incorrectas",
        errors: err,
      });
    }

    //crar un token

    res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      id: usuarioDB._id,
    });
  });
});

module.exports = app;
