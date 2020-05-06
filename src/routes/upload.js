const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());
// rutas
app.put("/:tipo/:id", (req, res, next) => {
  var tipo = req.params.tipo;
  var id = req.params.id;

  //tipos de coleccion
  var tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "Tipo de coleccion no es valida",
      error: { message: "Tipo de coleccion no es valida" },
    });
  }

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
  var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  //mover archivo de espacio temporal hacia direccion particular
  var path = `./uploads/${tipo}/${nombreArchivo}`;
  archivo.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al mover archivo",
        error: err,
      });
    }
    res.status(200).json({
      ok: true,
      mensaje: "Archivo movido",
      nombreArchivo: nombreArchivo,
    });
  });
});

module.exports = app;
