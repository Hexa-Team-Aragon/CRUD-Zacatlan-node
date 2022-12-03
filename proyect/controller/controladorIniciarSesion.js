import modeloUsuario from '../models/usuarios.js';
import db from '../config/db.js';


// Metodo funcion del login
const credenciales = async(req, res) => {
    const {
        usuario,
        clave
    } = req.body;
    const usuarioDB = await db.query(`select * from usuarios where nombre = '${usuario}' and contraseña = '${clave}';`
        , { model: modeloUsuario, mapToModel: true });
    if (usuarioDB.length == 1){
        req.session.nombre=usuario;
        req.session.rol=usuarioDB[0].dataValues.rol;
        res.redirect('/adminHoteles');
    }else{
        res.redirect('/login');
    }
}

// Muestra la pagina login
const pagLogin = (req, res) => {
    res.render("login");
}

export { pagLogin,credenciales }