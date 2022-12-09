var validator = require("validator");
const barco = require("../modelos/barco");
const Barco = require("../modelos/barco");

var controller = {
    probando: function(req,res){
        return res.status(200).send({
            message: "Entramos a la funcion probando"
        })
    },
    save: function(req,res){
        var params =req.body;

        console.log(params);
        var validate_serie = !validator.isEmpty(params.serie);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_brand = !validator.isEmpty(params.marca);
        var validate_model = !validator.isEmpty(params.modelo);
        if(validate_serie && validate_name && validate_brand && validate_model){
            var barco = new Barco();
            barco.serie = params.serie;
            barco.nombre = params.nombre;
            barco.marca = params.marca;
            barco.modelo = params.modelo;
            console.log(barco);
            barco.save((err, shipStored) =>{
                return res.status(200).send({
                    message:"Barco guardado",
                    barco: shipStored
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
        var barcoId = req.params.id;
        console.log(barcoId);
        var validate_serie = !validator.isEmpty(params.serie);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_brand = !validator.isEmpty(params.marca);
        var validate_model = !validator.isEmpty(params.modelo);
        if(validate_serie && validate_name && validate_brand && validate_model){
            var update = {
                serie:params.serie,
                nombre:params.nombre,
                marca:params.marca,
                modelo:params.modelo
            }
            barco.findOneAndUpdate({_id:barcoId},update,{new:true},(err,shipUpdate) => {
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!shipUpdate){
                    return res.status(404).send({
                        message:"No se pudo actualizar",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Se actualizó correctamente",
                    shipUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de los datos invalida"
            })
        }
       
    },
    delete:function(req,res){
        var barcoId = req.params.id;
        barco.findOneAndDelete({_id:barcoId},(err,shipRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                })
            }

            if(!shipRemoved){
                return res.status(404).send({
                    message:"No se pudo eliminar",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Barco Eliminado",
                status:shipRemoved
            });
            
        })

    },
    listarBarcos:function(req,res){
        barco.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Listado de Barcos",
                doc
            });
        })
       
    },
    verBarco:function(req,res){
        var barcoId = req.params.id;

        barco.findById(barcoId)
                .exec((err, barco)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        })
                    }
        
                    if(!barco){
                        return res.status(404).send({
                            message:"No se encontró el usuario",
                            status:"Error"
                        });
                    }

                    return res.status(200).send({
                        message: "usuario encontrado",
                        barco
                    });
                })

    }
    
}

module.exports = controller;