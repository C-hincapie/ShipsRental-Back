const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var ShipSchema = Schema({
    serie: String,
    nombre: String,
    marca: String,
    modelo: String
})

module.exports = mongoose.model("Barco", ShipSchema);