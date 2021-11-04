const mysql = require('mysql');

//Crear la conexion
const conexion = mysql.createConnection({
    host:'localhost',
    database:'parcial2',
    user: 'root',
    password: '123'
});

//Conectarse a la base de datos
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("CONEXION A LA BASE DE DATOS EXITOSA")
    }
});

//Hacer consultas
/*conexion.query('SELECT * FROM usuarios', function(error, results, fields){
    if(error){
        throw error;
    }else{
        results.forEach(result => {
            console.log(result);
        })
    }
});*/

module.exports = conexion;