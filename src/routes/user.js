const express = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const app = express();
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
app.post("/", (req, res) => {
  var body = req.body;
  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
    role: body.role,
  });

  usuario.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear usuario",
        errors: err,
      });
    }
    res.status(201).json({
      ok: true,
      usuario: usuarioGuardado,
    });
  });
});

module.exports = app;
