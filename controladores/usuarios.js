var validator = require("validator");
const usuario = require("../modelos/usuario");
const Usuario = require("../modelos/usuario");

var controller = {
        save: function(req, res){
        var params = req.body;
        
        console.log(params);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_pass = !validator.isEmpty(params.pass);
        console.log(validate_pass);
        if(validate_name && validate_surname && validate_email && validate_pass){
            var usuario = new Usuario();
            usuario.name = params.nombre;
            usuario.surname = params.surname;
            usuario.email = params.email;
            usuario.password = params.pass;
            usuario.role = "Rol de usuario";
            console.log(usuario);
            usuario.save((err, userStored) =>{
                return res.status(200).send({
                    message:"Usuario guardado",
                    usuario: userStored
                })
            })
            
        }else{
            return res.status(200).send({
                message:"Ingresa todos los datos, y asegurate de que el correo sea valido",
                params
            })
        }
        
    },

    login:function(req,res){
        return res.status(200).send({
            message:"Metodo Login"
        })
    },

    update:function(req,res){
        var params = req.body;
        console.log(params);
        var usuarioId = req.params.id;
        console.log(usuarioId);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_pass = !validator.isEmpty(params.pass);
        if(validate_name && validate_surname && validate_email && validate_pass){
            var update = {
                name:params.nombre,
                surname:params.surname,
                email:params.email,
                password:params.pass
            }
            usuario.findOneAndUpdate({_id:usuarioId},update,{new:true},(err,userUpdate) => {
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!userUpdate){
                    return res.status(404).send({
                        message:"No se pudo actualizar",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Se actualizó correctamente",
                    userUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de los datos invalida"
            })
        }
       
    },

    delete:function(req,res){
        var usuarioId = req.params.id;
        usuario.findOneAndDelete({_id:usuarioId},(err,userRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                })
            }

            if(!userRemoved){
                return res.status(404).send({
                    message:"No se pudo eliminar",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Usuario Eliminado",
                status:userRemoved
            });
            
        })

    },

    listarUsuarios:function(req,res){
        usuario.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Listado de Usuarios",
                doc
            });
        })
       
    },

    verUsuario:function(req,res){
        var usuarioId = req.params.id;

        usuario.findById(usuarioId)
                .exec((err, usuario)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        })
                    }
        
                    if(!usuario){
                        return res.status(404).send({
                            message:"No se encontró el usuario",
                            status:"Error"
                        });
                    }

                    return res.status(200).send({
                        message: "usuario encontrado",
                        usuario
                    });
                })

    }
}

module.exports = controller;