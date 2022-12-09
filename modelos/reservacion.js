const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var reservationSchema = Schema({
    fecha_inicio: Date,
    fecha_entrega: Date
})

module.exports = mongoose.model("reservacion", reservationSchema);