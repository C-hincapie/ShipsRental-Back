var express = require("express");

var messageController = require("../controladores/mensajes");

var router = express.Router();

router.post("/guardarMensaje", messageController.save);
router.put("/actualizarMensaje/:id",messageController.update);
router.delete("/eliminarMensaje/:id",messageController.delete);
router.get("/mensajes",messageController.listarMensajes);
router.get("/mensaje/:id",messageController.verMensaje);

module.exports = router;