var express = require("express");

var clientController = require("../controladores/clientes");

var router = express.Router();

router.get("/probando",clientController.probando);
router.post("/guardarCliente", clientController.save);
router.put("/actualizarCliente/:id",clientController.update);
router.delete("/eliminarCliente/:id",clientController.delete);
router.get("/clientes",clientController.listarClientes);
router.get("/cliente/:id",clientController.verCliente);

module.exports = router;