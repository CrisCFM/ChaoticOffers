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
    const usuario = req.session.name;
    //MENU DINAMICO
    conexion.query('SELECT id_usuarios FROM usuarios WHERE username = ?', [usuario], (error1, results1) => {
        if(error1){
            throw error1;
        }else{
            const sql = 'SELECT id_act FROM gest_actividades WHERE id_usuario = ?'
            const id_usuario = results1[0].id_usuarios;
            conexion.query('SELECT * FROM actividades WHERE id_actividad IN (' + sql + ')', [id_usuario], (error2, resultados) => {
                if(error2){
                    throw error2;
                }else{
                    // console.log(resultados);
                    if (req.session.loggedin) {
                        // res.render('Dashboard', {login: true, name: req.session.name});
                        res.render('Dashboard', {login: true, name: req.session.name, resultados:resultados});           
                    } else {
                        res.render('Dashboard', {login: false, name: "Debe iniciar sesión"});			
                    }
                    res.end();  
                }
            });
        }
    });
});

//RUTA PARA LISTAR LOS VIDEOJUEGOS
router.get('/dashboard/listavideojuegos', (req, res) => {
    const usuario = req.session.name;
    //MENU DINAMICO
    conexion.query('SELECT id_usuarios FROM usuarios WHERE username = ?', [usuario], (error1, results1) => {
        if(error1){
            throw error1;
        }else{
            const sql = 'SELECT id_act FROM gest_actividades WHERE id_usuario = ?'
            const id_usuario = results1[0].id_usuarios;
            conexion.query('SELECT * FROM actividades WHERE id_actividad IN (' + sql + ')', [id_usuario], (error2, resultados) => {
                if(error2){
                    throw error2;
                }else{
                    console.log(resultados);
                    //TRAER LA TABLA 
                    conexion.query('SELECT * FROM videojuego', (error3, results) => {
                        if(error3){
                            throw error3
                        }else{
                            if (req.session.loggedin) {
                                res.render('listaVideojuegos', {login: true, name: req.session.name, results:results, resultados:resultados});          
                            } else {
                                res.render('/',{
                                    login:false,
                                    name:'Debe iniciar sesión',			
                                });
                            }
                            res.end();     
                        }
                    });
                }
            });
        }
    });
});

//RUTA PARA LISTAR LOS USUARIOS
router.get('/dashboard/listaUsuarios', (req, res) => {
    const usuario = req.session.name;
    //MENU DINAMICO
    conexion.query('SELECT id_usuarios FROM usuarios WHERE username = ?', [usuario], (error1, results1) => {
        if(error1){
            throw error1;
        }else{
            const sql = 'SELECT id_act FROM gest_actividades WHERE id_usuario = ?'
            const id_usuario = results1[0].id_usuarios;
            conexion.query('SELECT * FROM actividades WHERE id_actividad IN (' + sql + ')', [id_usuario], (error2, resultados) => {
                if(error2){
                    throw error2;
                }else{
                    console.log(resultados);
                    //TRAER LA TABLA 
                    conexion.query('SELECT * FROM usuarios', (error3, results) => {
                        if(error3){
                            throw error3
                        }else{
                            if (req.session.loggedin) {
                                res.render('listaUsuarios', {login: true, name: req.session.name, results:results, resultados:resultados});          
                            } else {
                                res.render('/',{
                                    login:false,
                                    name:'Debe iniciar sesión',			
                                });
                            }
                            res.end();     
                        }
                    });
                }
            });
        }
    });
});

//RUTA PARA GESTIONAR ACTIVIDADES
router.get('/dashboard/gestionactividades/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id_usuarios=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('gestionActividades', {user:results[0]});
        }
    });
});

//RUTA PARA AGREGAR USUARIO
router.get('/agregaUsuario', (req, res) => {
    res.render('agregarUsuario');
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
                // const sesion = req.session;
                // console.log(sesion);
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
router.post('/addActivity', crud.addActivity);

module.exports = router;