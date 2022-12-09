var express = require("express");

var shipsController = require("../controladores/barcos");

var router = express.Router();

router.get("/probando",shipsController.probando);
router.post("/guardarBarco", shipsController.save);
router.put("/actualizarBarco/:id",shipsController.update);
router.delete("/eliminarBarco/:id",shipsController.delete);
router.get("/barcos",shipsController.listarBarcos);
router.get("/barco/:id",shipsController.verBarco);

module.exports = router;