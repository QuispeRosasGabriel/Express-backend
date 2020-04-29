const express = require("express");
const Hospital = require("../models/hospital");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const mdAuth = require("../middleware/auth");

const app = express();
// rutas
// ===============================
//obtener todos los hospitales
// ===============================

app.get("/", (req, res) => {
  //listando hospitales
  Hospital.find({}, "nombre img usuario").exec((err, hospitales) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error en base de datos",
        errors: err,
      });
    }
    res.status(200).json({
      ok: true,
      hospitales: hospitales,
    });
  });
});

module.exports = app;
