//Definir las rutas de nuestro proyecto
const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res) => {
    // res.render('index.ejs', {var1: 'Esto es una variable'});
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        }else{
            // res.send(results);
            res.render('index', {results});
        }
    });
});

router.post('/pruebaF', (req, res) =>{
    res.redirect('/');
});

module.exports = router;