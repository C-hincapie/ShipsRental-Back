var validator = require("validator");
const categoria = require("../modelos/categoria");
const Categoria = require("../modelos/categoria");

var controller = {
    probando: function(req,res){
        return res.status(200).send({
            message: "Entramos a la funcion probando"
        })
    },
    save: function(req,res){
        var params =req.body;

        console.log(params);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_description = !validator.isEmpty(params.descripcion);
        if(validate_name && validate_description){
            var categoria = new Categoria();
            categoria.nombre = params.nombre;
            categoria.descripcion = params.descripcion;
            console.log(categoria);
            categoria.save((err, categoryStored) =>{
                return res.status(200).send({
                    message:"Categoria guardada",
                    categoria: categoryStored
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
        var categoriaId = req.params.id;
        console.log(categoriaId);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_description = !validator.isEmpty(params.descripcion);
        if(validate_name && validate_description){
            var update = {
                nombre:params.nombre,
                descripcion:params.descripcion
            }
            categoria.findOneAndUpdate({_id:categoriaId},update,{new:true},(err,categoryUpdate) => {
                if(err){
                    return res.status(500).send({
                        message:"Error en la petición",
                        status:"Error"
                    });
                }

                if(!categoryUpdate){
                    return res.status(404).send({
                        message:"No se pudo actualizar",
                        status:"Error"
                    });
                }
                return res.status(200).send({
                    message:"Se actualizó correctamente",
                    categoryUpdate
                });
            })

        }else{
            return res.status(200).send({
                message:"Validación de los datos invalida"
            })
        }
       
    },
    delete:function(req,res){
        var categoriaId = req.params.id;
        categoria.findOneAndDelete({_id:categoriaId},(err,categoryRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                })
            }

            if(!categoryRemoved){
                return res.status(404).send({
                    message:"No se pudo eliminar",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Categoria Eliminada",
                status:categoryRemoved
            });
            
        })

    },
    listarCategorias:function(req,res){
        categoria.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Listado de Categorias",
                doc
            });
        })
       
    },
    verCategoria:function(req,res){
        var categoriaId = req.params.id;

        categoria.findById(categoriaId)
                .exec((err, categoria)=>{
                    if(err){
                        return res.status(500).send({
                            message:"Error en la petición",
                            status:"Error"
                        })
                    }
        
                    if(!categoria){
                        return res.status(404).send({
                            message:"No se encontró la categoria",
                            status:"Error"
                        });
                    }

                    return res.status(200).send({
                        message: "categoria encontrada",
                        categoria
                    });
                })

    }
    
}

module.exports = controller;