const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var categorySchema = Schema({
    nombre: String,
    descripcion: String
})

module.exports = mongoose.model("categoria", categorySchema);