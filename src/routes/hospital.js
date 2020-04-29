const express = require("express");
const Hospital = require("../models/hospital");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mdAuth = require("../middleware/auth");

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

// ===============================
//Actualizar  info hospital
// ===============================
app.put("/:id", mdAuth.verificaToken, (req, res) => {
  var id = req.params.id;
  var body = req.body;

  //Verificar si existe hospital con ese id
  Hospital.findById(id, (err, hospital) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar el hospital",
        errors: err,
      });
    }

    if (!hospital) {
      return res.status(400).json({
        ok: false,
        mensaje: `El hospital con el id ${id} no existe`,
        errors: { message: "No existe un hospital con ese id" },
      });
    }

    hospital.nombre = body.nombre;
    hospital.img = body.img;
    hospital.usuario = body.usuario;

    hospital.save((err, hospitalGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar ese hospital",
          errors: err,
        });
      }
      res.status(200).json({
        ok: true,
        hospital: hospitalGuardado,
      });
    });
  });
});

// ===============================
//Actualizar hospital
// ===============================

app.put("/:id", mdAuth.verificaToken, (req, res) => {
  var id = req.params.id;
  var body = req.body;

  //verificar si un hospital tiene ese id
  Hospital.findById(id, (err, hospital) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar ese hospital",
        errors: err,
      });
    }

    if (!hospital) {
      return res.status(400).json({
        ok: false,
        mensaje: `El hospital con el id ${id} no existe`,
        errors: { message: "No existe un hospital con ese id" },
      });
    }
    hospital.nombre = body.nombre;
    hospital.img = body.img;
    hospital.usuario = body.usuario;

    hospital.save((err, hospitalGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar ese hospital",
          errors: err,
        });
      }
      res.status(200).json({
        ok: true,
        hospital: hospitalGuardado,
      });
    });
  });
});

module.exports = app;
