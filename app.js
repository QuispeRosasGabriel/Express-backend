const express = require("express");
const app = express();

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
