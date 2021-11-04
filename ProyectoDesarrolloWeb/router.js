//Definir las rutas de nuestro proyecto
const express = require('express');
const router = express.Router();
const crud = require('./controller/crud'); //Llamar al controlador

const conexion = require('./database/db');

//RUTA PARA LISTAR LOS USUARIOS
router.get('/listaUsuarios', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        }else{
            // res.send(results);
            res.render('listaUsuarios', {results:results});
        }
    });
});

//RUTA PARA CREAR USUARIOS
router.get('/create', (req, res) => {
    res.render('create');
});

//RUTA PARA EDITAR USUARIOS
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id_usuarios=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('edit', {user:results[0]});
        }
    });
});

//RUTA PARA ELIMINAR USUARIO
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id_usuarios = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/listaUsuarios');
        }
    });
});


router.post('/pruebaF', (req, res) =>{
    res.redirect('/');
});

//CONTROLADOR
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;