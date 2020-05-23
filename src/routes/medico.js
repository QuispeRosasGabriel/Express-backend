const express = require("express");
const Medico = require("../models/medico");
const mdAuth = require("../middleware/auth");

const app = express();

// rutas
// ===============================
//obtener todos los medicos
// ===============================

app.get("/", (req, res) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);
  //listando medicos
  Medico.find({})
    .skip(desde)
    .limit(5)
    .populate("usuario", "nombre email")
    .populate("hospitales")
    .exec((err, medicos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error en base de datos",
          errors: err,
        });
      }
      Medico.count({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          medicos: medicos,
          total: conteo,
        });
      });
    });
});

// ===============================
//obtener medico
// ===============================

app.get("/:id", (req, res) => {
  var id = req.params.id;
  Medico.findById(id)
    .populate("usuario", "nombre email img")
    .populate("hospitales", "nombre img usuario")
    .exec((err, medico) => {
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
      res.status(200).json({
        ok: true,
        medico: medico,
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
