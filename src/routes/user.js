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
//Actualizar  usuario
// ===============================
app.put("/:id", (req, res) => {
  var id = req.params.id;
  var body = req.body;

  //verificar si un usuario tiene ese id
  Usuario.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar usuario",
        errors: err,
      });
    }

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: `El usuario con el id ${id} no existe`,
        errors: { message: "No existe un usuario con ese id" },
      });
    }

    usuario.nombre = body.nombre;
    usuario.email = body.email;
    usuario.role = body.role;

    usuario.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar usuario",
          errors: err,
        });
      }
      usuarioGuardado.password = ":)";

      res.status(200).json({
        ok: true,
        usuario: usuarioGuardado,
      });
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
