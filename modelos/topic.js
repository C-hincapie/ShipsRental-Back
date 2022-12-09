const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = Schema({
    conten: String,
    date:{type: Date, default: Date.now},
    cliente: {type:Schema.ObjectId, ref:"cliente"}
});

var Comment = mongoose.model("Coment", CommentSchema);

var TopicSchema = Schema({
    title:String,
    content:String,
    code:String,
    lang:String,
    date:{type: Date, default: Date.now},
    cliente:{type:Schema.ObjectId, ref:"cliente"},
    comments:[CommentSchema]
})

module.exports = mongoose.model("topic", TopicSchema);