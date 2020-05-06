const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
// rutas
app.put("/:tipo/:id", (req, res, next) => {
  var tipo = req.params.tipo;
  var id = req.params.id;

  if (!req.files) {
    return res.status(500).json({
      ok: false,
      mensaje: "No selecciono archivos",
      error: { message: "debe seleccionar una imagen" },
    });
  }

  //obtener nombre del archivo y capturando extension de archivos
  var archivo = req.files.imagen;
  var nombreCortado = archivo.name.split(".");
  var extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //solo aceptamos estas extensiones
  const extensiones_validas = ["png", "jpg", "gif", "jpeg"];

  if (extensiones_validas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Extension no valida",
      error: {
        message:
          "Las extensiones validas son:" + extensiones_validas.join(", "),
      },
    });
  }

  //crear nombre de archivo personalizado
  var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo} `;

  //mover archivo de espacio temporal hacia direccion particular
  var path;

  res.status(200).json({
    ok: true,
    mensaje: "Peticion Realizada correctamente",
    nombreArchivo: nombreArchivo,
  });
});

module.exports = app;
