const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const SEED = require("../config/config").SEED;

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
    usuarioDB.password = ":)";
    var token = jwt.sign({ usuario: usuarioDB }, SEED, {
      expiresIn: 14400,
    });
    var token = res.status(200).json({
      ok: true,
      usuario: usuarioDB,
      token: token,
      id: usuarioDB._id,
      menu: obtenerMenu(usuarioDB.role),
    });
  });
});

function obtenerMenu(role) {
  menu = [
    {
      titulo: "Principal",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Dashboard", url: "/dashboard" },
        { titulo: "Progress", url: "/progress" },
        { titulo: "Gráficas", url: "/graficas1" },
        { titulo: "Promesas", url: "/promesas" },
        { titulo: "Rxjs", url: "/rxjs" },
      ],
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        // { titulo: "Usuarios", url: "/usuarios" },
        { titulo: "Hospitales", url: "/hospitales" },
        { titulo: "Medicos", url: "/medicos" },
      ],
    },
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ titulo: "Usuarios", url: "/usuarios" });
  }

  return menu;
}
module.exports = app;
