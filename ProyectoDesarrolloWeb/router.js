//Definir las rutas de nuestro proyecto
const { application } = require('express');
const express = require('express');
const router = express.Router();
const crud = require('./controller/crud'); //Llamar al controlador

const conexion = require('./database/db');



//RUTA RAIZ
router.get('/', (req, res) => {
    res.render('index');
});

//RUTAS DE LA PAGINA WEB

//RUTA PARA EL LOGEO DE USUARIOS
router.get('/login', (req, res) => {
    res.render('Login');
});

//RUTA PARA EL REGISTER DE USUARIOS
router.get('/register', (req, res) => {
    res.render('Register');
});

//RUTA DEL DASHBOARD
router.get('/dashboard', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            throw error;
        }else{
            if (req.session.loggedin) {
                res.render('Dashboard', {results:results, login: true, name: req.session.name});
            } else {
                res.render('Dashboard', {results:results, login: false, name: "Debe iniciar sesión"});			
            }
            res.end();
            // res.render('Dashboard', {results:results});
        }
    });
});

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

//RUTA PARA EDITAR USUARIOS
router.get('/editarUsuario/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id_usuarios=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('editarUsuario', {user:results[0]});
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
            res.redirect('/dashboard');
        }
    });
});

//LOGIN DE USUARIO
router.post('/auth', (req, res) => {
    const user = req.body.txtusuario;
    const pass = req.body.txtpassword; 

    if(user && pass){
        conexion.query('SELECT * FROM usuarios WHERE username = ?', [user], (error, results) => {
            if(results.length == 0 || (pass == results.clave)){
                res.send('USUARIO Y/O CONTRASEÑA INCORRECTAS')
            }else{
                req.session.loggedin = true;                
				req.session.name = results[0].username;
                const sesion = req.session;
                console.log(sesion);
                res.redirect('/dashboard');
            }
        });
    }
});

//DESCONEXION
router.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});

//CONTROLADOR
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;