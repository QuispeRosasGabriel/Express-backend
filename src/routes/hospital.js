const express = require("express");
const Hospital = require("../models/hospital");

const mdAuth = require("../middleware/auth");

const app = express();
// rutas
// ===============================
//obtener todos los hospitales
// ===============================

app.get("/", (req, res) => {
  var desde = req.query.desde || 0;
  desde = Number(desde);
  //listando hospitales
  Hospital.find({})
    .skip(desde)
    .limit(5)
    .populate("usuario", "nombre email")
    .exec((err, hospitales) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error en base de datos",
          errors: err,
        });
      }
      Hospital.count({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          hospitales: hospitales,
          total: conteo,
        });
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
    //grabar que usuario hizo el cambio
    hospital.usuario = req.usuario._id;

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

// ==========================================
// Crear un nuevo hospital
// ==========================================
app.post("/", mdAuth.verificaToken, (req, res) => {
  var body = req.body;

  var hospital = new Hospital({
    nombre: body.nombre,
    usuario: req.usuario._id,
  });

  hospital.save((err, hospitalGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear hospital",
        errors: err,
      });
    }

    res.status(201).json({
      ok: true,
      hospital: hospitalGuardado,
    });
  });
});

// ===============================
//Eliminar un hospital
// ===============================
app.delete("/:id", mdAuth.verificaToken, (req, res) => {
  var id = req.params.id;
  Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar el hospital",
        errors: err,
      });
    }

    if (!hospitalBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: `El hospital con el id ${id} no existe`,
        errors: { message: "No existe un hospital con ese id" },
      });
    }

    res.status(200).json({
      ok: true,
      hospital: hospitalBorrado,
    });
  });
});

module.exports = app;
