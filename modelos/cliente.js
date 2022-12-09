const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    documento: String,
    nombre: String,
    email: String,
    edad: String
})

module.exports = mongoose.model("Cliente", ClientSchema);