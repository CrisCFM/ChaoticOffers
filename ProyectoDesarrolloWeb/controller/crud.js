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
        res.redirect('/');
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