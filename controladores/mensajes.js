var validator = require("validator");
const mensaje = require("../modelos/mensaje");
const Mensaje = require("../modelos/mensaje");

var controller = {
    save: function(req,res){
        var params =req.body;

        console.log(params);
        var validate_asunto = !validator.isEmpty(params.asunto);
        var validate_mensaje = !validator.isEmpty(params.mensaje);
        if(validate_asunto && validate_mensaje){
            var mensaje = new Mensaje();
            mensaje.asunto = params.asunto;
            mensaje.mensaje = params.mensaje;
            console.log(mensaje);
            mensaje.save((err, messageStored) =>{
                return res.status(200).send({
                    message:"Mensaje guardado",
                    barco: messageStored
                })
            })
        }else{
            return res.status(200).send({
                message:"Ingresa todos los datos de nuevo",
                params
            })
        }
    },
    update:function(req,res){
        var params = req.body;
        console.log(params);
        var mensajeId = req.params.id;
        console.log(mensajeId);
        var validate_asunto = !validator.isEmpty(params.asunto);
        var validate_mensaje = !validator.isEmpty(params.mensaje);
        if(validate_asunto && validate_mensaje){
            var update = {
                asunto:params.asunto,
                mensaje:params.mensaje
            }
            mensaje.findOneAndUpdate({_id:mensajeId},update,{new:true},(err,messageUpdate) => {
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!messageUpdate){
                    return res.status(404).send({
                        message:"No se pudo actualizar",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Se actualizó correctamente",
                    messageUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de los datos invalida"
            })
        }
       
    },
    delete:function(req,res){
        var messageId = req.params.id;
        mensaje.findOneAndDelete({_id:messageId},(err,messageRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                })
            }

            if(!messageRemoved){
                return res.status(404).send({
                    message:"No se pudo eliminar",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Mensaje Eliminado",
                status:messageRemoved
            });
            
        })

    },
    listarMensajes:function(req,res){
        mensaje.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Listado de Mensaje",
                doc
            });
        })
       
    },
    verMensaje:function(req,res){
        var mensajeId = req.params.id;

        mensaje.findById(mensajeId)
                .exec((err, mensaje)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        })
                    }
        
                    if(!mensaje){
                        return res.status(404).send({
                            message:"No se encontró el mensaje",
                            status:"Error"
                        });
                    }

                    return res.status(200).send({
                        message: "mensaje encontrado",
                        mensaje
                    });
                })

    }
    
}

module.exports = controller;