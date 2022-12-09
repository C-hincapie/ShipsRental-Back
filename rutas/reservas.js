var express = require("express");

var reservationController = require("../controladores/reservaciones");

var router = express.Router();

router.get("/probando",reservationController.probando);
router.post("/guardarReservacion", reservationController.save);
router.put("/actualizarReservacion/:id",reservationController.update);
router.delete("/eliminarReservacion/:id",reservationController.delete);
router.get("/reservaciones",reservationController.listarReservaciones);
router.get("/reservacion/:id",reservationController.verReservacion);

module.exports = router;