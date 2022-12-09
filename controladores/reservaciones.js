var validator = require("validator");
const reservacion = require("../modelos/reservacion");
const Reservacion = require("../modelos/reservacion");

var controller = {
    probando: function(req,res){
        return res.status(200).send({
            message: "Entramos a la funcion probando"
        })
    },
    save: function(req,res){
        var params =req.body;

        console.log(params);
        var validate_initDate = !validator.isDate(params.fecha_inicio);
        var validate_endDate = !validator.isDate(params.fecha_entrega);
        if(validate_initDate && validate_endDate){
            var reservacion = new Reservacion();
            reservacion.fecha_inicio = params.fecha_inicio;
            reservacion.fecha_entrega = params.fecha_entrega;
            console.log(reservacion);
            reservacion.save((err, reservationStored) =>{
                return res.status(200).send({
                    message:"Reservacion guardada",
                    reservacion: reservationStored
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
        var reservacionId = req.params.id;
        console.log(reservacionId);
        var validate_initDate = !validator.isDate(params.fecha_inicio);
        var validate_endDate = !validator.isDate(params.fecha_entrega);
        if(validate_initDate && validate_endDate){
            var update = {
                fecha_inicio:params.fecha_inicio,
                fecha_entrega:params.fecha_entrega
            }
            reservacion.findOneAndUpdate({_id:reservacionId},update,{new:true},(err,reservationUpdate) => {
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!reservationUpdate){
                    return res.status(404).send({
                        message:"No se pudo actualizar",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Se actualizó correctamente",
                    reservationUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de los datos invalida"
            })
        }
       
    },
    delete:function(req,res){
        var reservacionId = req.params.id;
        reservacion.findOneAndDelete({_id:reservacionId},(err,reservationRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                })
            }

            if(!reservationRemoved){
                return res.status(404).send({
                    message:"No se pudo eliminar",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Categoria Eliminada",
                status:reservationRemoved
            });
            
        })

    },
    listarReservaciones:function(req,res){
        reservacion.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Listado de Reservaciones",
                doc
            });
        })
       
    },
    verReservacion:function(req,res){
        var reservacionId = req.params.id;

        reservacion.findById(reservacionId)
                .exec((err, reservacion)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        })
                    }
        
                    if(!reservacion){
                        return res.status(404).send({
                            message:"No se encontró la reservacion",
                            status:"Error"
                        });
                    }

                    return res.status(200).send({
                        message: "reservacion encontrada",
                        reservacion
                    });
                })

    }
    
}

module.exports = controller;