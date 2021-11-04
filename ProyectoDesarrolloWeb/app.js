const { json } = require('express');
const express = require('express');
const app = express();
const path = require('path');


app.listen(5000, () => {
    console.log('SERVER CORRIENDO EN PUERTO 5000');
});

//Definir motor de plantillas
app.set('view engine', 'ejs');

//Decirle como capturar los datos de los formularios
app.use(express.urlencoded({extended: false}));
app.use(express(json));

//Usar css en servidor express
app.use(express.static(path.join(__dirname, "public")));

//Ubicar la carpeta views
app.set("views", path.join(__dirname, "views"));

//Usar el router creado
app.use('/', require('./router'));
