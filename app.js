const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas
const appRoutes = require("./src/routes/app");
const userRoutes = require("./src/routes/user");
//Conexion a la base de datos
mongoose.connection.openUri(
  "mongodb://localhost:27017/hospitalDB",
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos:online");
  }
);

//rutas
app.use("/users", userRoutes);
app.use("/", appRoutes);

//escuchar express
app.listen(3000, () => {
  console.log("Express funciona:online");
});
