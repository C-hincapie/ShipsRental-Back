var express = require("express");
var UserController = require("../controladores/usuarios");

var router = express.Router();


router.post("/login", UserController.login);
router.post("/guardarUsuario", UserController.save);
router.put("/actualizarUsuario/:id",UserController.update);
router.delete("/eliminarUsuario/:id",UserController.delete);
router.get("/usuarios",UserController.listarUsuarios);
router.get("/usuario/:id",UserController.verUsuario);

module.exports = router;
