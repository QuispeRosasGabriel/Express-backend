const express = require("express");
const app = express();

var Hospital = require("../models/hospital");
var Medico = require("../models/medico");
// rutas
app.get("/todo/:busqueda", (req, res, next) => {
  var busqueda = req.params.busqueda;
  var regex = new RegExp(busqueda, "i");

  buscarHospitales(busqueda, regex).then((hospitales) => {
    res.status(200).json({
      ok: true,
      mensaje: "Peticion Realizada correctamente",
      hospitales: hospitales,
    });
  });
});

function buscarHospitales(busqueda, regex) {
  return new Promise((res, rej) => {
    Hospital.find({ nombre: regex }, (err, hospitales) => {
      if (err) {
        rej("Error al cargar hospitales", err);
      } else {
        res(hospitales);
      }
    });
  });
}

module.exports = app;
