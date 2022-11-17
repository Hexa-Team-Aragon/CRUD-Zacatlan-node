import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const gerentes = db.define('gerentes', {
    id_gr: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_ht: {
        type: Sequelize.INTEGER,
        foreingKey:true
    },
    nombre: {
        type: Sequelize.STRING
    },
    apellido_paterno: {
        type: Sequelize.STRING
    },
    apellido_materno: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    }
}, { timestamps: false });

export default gerentes;