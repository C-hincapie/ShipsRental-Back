const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = Schema({
    asunto: String,
    mensaje: String
})

module.exports = mongoose.model("Mensaje", MessageSchema);