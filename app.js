const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas
const busquedaRoutes = require("./src/routes/busqueda");
const medicoRoutes = require("./src/routes/medico");
const hospitalRoutes = require("./src/routes/hospital");
const appRoutes = require("./src/routes/app");
const userRoutes = require("./src/routes/user");
const loginRoutes = require("./src/routes/login");
//Conexion a la base de datos
mongoose.connection.openUri(
  "mongodb://localhost:27017/hospitalDB",
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos:online");
  }
);

//rutas
app.use("/busqueda", busquedaRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/login", loginRoutes);
app.use("/usuario", userRoutes);
app.use("/", appRoutes);

//escuchar express
app.listen(3000, () => {
  console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m", "online");
});
