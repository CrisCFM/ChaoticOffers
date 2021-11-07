const conexion = require('../database/db');

//Crear y guardar usuario
exports.save = (req, res) => {
    let sql = 'INSERT INTO usuarios SET ?'
    let post = {
        nombre: req.body.Fnombre,
        correo : req.body.Fcorreo,
        telefono: req.body.Ftel,
        username: req.body.Fusername,
        clave: req.body.Fpass
    }
    conexion.query(sql, post, (err, results) => {
        if(err) throw err;
        console.log('USUARIO CREADO CON EXITO');
        res.redirect('/dashboard');
    });
};

//Editar usuario
exports.update = (req, res) => {
    const id = req.body.id;
    let sql = 'UPDATE usuarios SET ? WHERE id_usuarios = ?'
    let post = {
        nombre: req.body.Enombre,
        correo : req.body.Ecorreo,
        telefono: req.body.Etel,
        username: req.body.Eusername,
        clave: req.body.Epass       
    }
    
    conexion.query(sql, [post, id], (err, results) => {
        if(err) throw err;
        console.log('USUARIO EDITADO CON EXITO');
        res.redirect('/dashboard');
    });
};

//Crear y gestionar una actividad en un usuario
exports.addActivity = (req, res) =>{
    let actividad = {
        id_actividad : req.body.idAct,
        nombre : req.body.nombreAct,
        enlace : req.body.enlaceAct
    };

    let gestion = {
        id_gest : req.body.idGestAct,
        id_act : req.body.idAct,
        id_usuario : req.body.id
    };

    let sql = 'INSERT INTO actividades SET ?';
    let sql2 = 'INSERT INTO gest_actividades SET ?';
    
    conexion.query(sql, actividad, (err, results) => {
        if(err){
            throw err;
        }else{
            console.log('ACTIVIDAD CREADA CON EXITO');
            conexion.query(sql2, gestion, (error, resu) => {
                if(error){
                    throw error;
                }else{
                    console.log('GESTION CREADA CON EXITO');
                    res.redirect('/dashboard');
                }
            })
        }
    });
};