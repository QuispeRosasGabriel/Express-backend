const jwt = require("jsonwebtoken");
const SEED = require("../config/config").SEED;

// ===============================
//Verificar token (middleware)
// ===============================
exports.verificaToken = function (req, res, next) {
  var token = req.query.token;
  jwt.verify(token, SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: "Token incorrecto",
        errors: err,
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

// ===============================
//Verificar admin (middleware)
// ===============================
exports.verificaAdminRole = function (req, res, next) {
  var usuario = req.usuario;
  if (usuario.role === "ADMIN_ROLE") {
    next();
    return;
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: "Token incorrecto - no es administrador",
      errors: { message: "No es administrador, no puede hacer eso" },
    });
  }
};

// ===============================
//Verificar mismo usuario (middleware)
// ===============================
exports.verificaMismoUsuario_Admin = function (req, res, next) {
  var id = req.params.id;
  var usuario = req.usuario;

  if (usuario.role === "ADMIN_ROLE" || usuario._id === id) {
    next();
    return;
  } else {
    return res.status(401).json({
      ok: false,
      mensaje: "No es dueño del usuario",
      errors: { message: "No es administrador, no puede hacer eso" },
    });
  }
};
