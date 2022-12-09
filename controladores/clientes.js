var validator = require("validator");
const cliente = require("../modelos/cliente");
const Cliente = require("../modelos/cliente");

var controller = {
    probando: function(req,res){
        return res.status(200).send({
            message: "Entramos a la funcion probando"
        })
    },
    save: function(req,res){
        var params =req.body;

        console.log(params);
        var validate_document = !validator.isEmpty(params.documento);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_email = !validator.isEmpty(params.email);
        var validate_age = !validator.isEmpty(params.edad);
        if(validate_document && validate_name && validate_email && validate_age){
            var cliente = new Cliente();
            cliente.documento = params.documento;
            cliente.nombre = params.nombre;
            cliente.email = params.email;
            cliente.edad = params.edad;
            console.log(cliente);
            cliente.save((err, clientStored) =>{
                return res.status(200).send({
                    message:"Cliente guardado",
                    cliente: clientStored
                })
            })
        }else{
            return res.status(200).send({
                message:"Ingresa todos los datos, y asegurate de que el correo sea valido",
                params
            })
        }
    },
    update:function(req,res){
        var params = req.body;
        console.log(params);
        var clienteId = req.params.id;
        console.log(clienteId);
        var validate_document = !validator.isEmpty(params.documento);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_email = !validator.isEmpty(params.email);
        var validate_age = !validator.isEmpty(params.edad);
        if(validate_document && validate_name && validate_email && validate_age){
            var update = {
                documento:params.documento,
                nombre:params.nombre,
                email:params.email,
                edad:params.edad
            }
            cliente.findOneAndUpdate({_id:clienteId},update,{new:true},(err,clientUpdate) => {
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!clientUpdate){
                    return res.status(404).send({
                        message:"No se pudo actualizar",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Se actualizó correctamente",
                    clientUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de los datos invalida"
            })
        }
       
    },
    delete:function(req,res){
        var clienteId = req.params.id;
        cliente.findOneAndDelete({_id:clienteId},(err,clientRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                })
            }

            if(!clientRemoved){
                return res.status(404).send({
                    message:"No se pudo eliminar",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Usuario Eliminado",
                status:clientRemoved
            });
            
        })

    },
    listarClientes:function(req,res){
        cliente.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Listado de Clientes",
                doc
            });
        })
       
    },
    verCliente:function(req,res){
        var clienteId = req.params.id;

        cliente.findById(clienteId)
                .exec((err, cliente)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        })
                    }
        
                    if(!cliente){
                        return res.status(404).send({
                            message:"No se encontró el usuario",
                            status:"Error"
                        });
                    }

                    return res.status(200).send({
                        message: "usuario encontrado",
                        cliente
                    });
                })

    }
    
}

module.exports = controller;