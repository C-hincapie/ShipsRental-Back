var express = require("express");

var categoryController = require("../controladores/categorias");

var router = express.Router();

router.get("/probando",categoryController.probando);
router.post("/guardarCategoria", categoryController.save);
router.put("/actualizarCategoria/:id",categoryController.update);
router.delete("/eliminarCategoria/:id",categoryController.delete);
router.get("/categorias",categoryController.listarCategorias);
router.get("/categoria/:id",categoryController.verCategoria);

module.exports = router;