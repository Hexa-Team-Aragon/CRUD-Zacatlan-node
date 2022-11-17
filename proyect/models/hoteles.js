import {Sequelize} from 'sequelize';
import db from '../config/db.js'

const Hoteles = db.define('hoteles', {
    id_ht: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    }
}, { timestamps: false });

export default Hoteles;