const express = require("express");
const Medico = require("../models/medico");
const mdAuth = require("../middleware/auth");

const app = express();

// rutas
// ===============================
//obtener todos los medicos
// ===============================

app.get("/", (req, res) => {
  //listando medicos
  Medico.find({}, "nombre img usuario").exec((err, medicos) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error en base de datos",
        errors: err,
      });
    }
    res.status(200).json({
      ok: true,
      medicos: medicos,
    });
  });
});

// ===============================
//Actualizar  info medico
// ===============================
app.put("/:id", mdAuth.verificaToken, (req, res) => {
  var id = req.params.id;
  var body = req.body;

  // verificar si existe medico con ese id
  Medico.findById(id, (err, medico) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar el medico",
        errors: err,
      });
    }
    if (!medico) {
      return res.status(400).json({
        ok: false,
        mensaje: `El medico con el id ${id} no existe`,
        errors: { message: "No existe un medico con ese id" },
      });
    }
    medico.nombre = body.nombre;
    medico.usuario = req.usuario._id;
    medico.hospital = body.hospital;

    medico.save((err, medicoGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar ese medico",
          errors: err,
        });
      }
      res.status(200).json({
        ok: true,
        medico: medicoGuardado,
      });
    });
  });
});

// ===============================
//crear nuevo medico
// ===============================
app.post("/", mdAuth.verificaToken, (req, res) => {
  var body = req.body;
  var medico = new Medico({
    nombre: body.nombre,
    //obtener id del usuario
    usuario: req.usuario._id,
    hospital: body.hospital,
  });

  medico.save((err, medicoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear medico",
        errors: err,
      });
    }

    res.status(201).json({
      ok: true,
      medico: medicoGuardado,
    });
  });
});

// ===============================
//Eliminar un medico
// ===============================
app.delete("/:id", mdAuth.verificaToken, (req, res) => {
  var id = req.params.id;
  Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar el medico",
        errors: err,
      });
    }

    if (!medicoBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: `El medico con el id ${id} no existe`,
        errors: { message: "No existe un medico con ese id" },
      });
    }

    res.status(200).json({
      ok: true,
      medico: medicoBorrado,
    });
  });
});

module.exports = app;
