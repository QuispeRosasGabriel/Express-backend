const express = require("express");
const mongoose = require("mongoose");
const app = express();
//Conexion a la base de datos
mongoose.connection.openUri(
  "mongodb://localhost:27017/hospitalDB",
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos:online");
  }
);

//escuchar express
app.listen(3000, () => {
  console.log("Express funciona:online");
});

// rutas
app.get("/", (req, res, next) => {
  res.status(200).json({
    ok: true,
    mensaje: "Peticion Realizada correctamente",
  });
});
