const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//server index config
// var serveIndex = require("serve-index");
// app.use(express.static(__dirname + "/"));
// app.use("/uploads", serveIndex(__dirname + "/uploads"));

//importar rutas
const imagenesRoutes = require("./src/routes/imagenes");
const uploadRoutes = require("./src/routes/upload");
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
app.use("/img", imagenesRoutes);
app.use("/upload", uploadRoutes);
app.use("/busqueda", busquedaRoutes);
app.use("/medico", medicoRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/login", loginRoutes);
app.use("/usuario", userRoutes);
app.use("/", appRoutes);

//escuchar express
app.listen(3000, () => {
  console.log("Express server puerto 3000: \x1b[32m%s\x1b[0m", "online");
});
