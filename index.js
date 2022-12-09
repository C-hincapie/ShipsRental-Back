const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const client_routes = require("./rutas/clientes");
const ship_routes = require("./rutas/barcos");
const category_routes = require("./rutas/categorias");
const reservation_routes = require("./rutas/reservas");
const user_routes = require("./rutas/usuarios");
const message_routes = require("./rutas/mensajes");

mongoose.Promise = global.Promise;
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));


mongoose.connect("mongodb://localhost:27017/barcosEquipo7",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4
})
.then(()=>{
    app.use("/api",client_routes);
    app.use("/api",ship_routes);
    app.use("/api",category_routes);
    app.use("/api",reservation_routes);
    app.use("/api",user_routes);
    app.use("/api",message_routes);

    app.listen(port, ()=>{
        console.log("Servidor en el puerto",port);
    });
})
.catch(error => console.log(error));