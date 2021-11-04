const express = require('express');
const app = express();
const path = require('path');


app.listen(5000, () => {
    console.log('SERVER CORRIENDO EN PUERTO 5000');
});

//Definir motor de plantillas
app.set('view engine', 'ejs');

//Usar css en servidor express
app.use(express.static(path.join(__dirname, "public")));

//Ubicar la carpeta views
app.set("views", path.join(__dirname, "views"));

//Usar el router creado
app.use('/', require('./router'));
