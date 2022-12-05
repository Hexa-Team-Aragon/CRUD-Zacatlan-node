import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const Usuarios = db.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    rol:{
        type: Sequelize.STRING
    }
}, { timestamps: false });

export default Usuarios;