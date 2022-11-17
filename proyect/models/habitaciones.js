import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const Habitaciones = db.define('habitaciones', {
    id_hbt: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_ht: {
        type: Sequelize.INTEGER,
        foreignKey: true,
    },
    piso: {
        type: Sequelize.STRING
    },
    nombre: {
        type: Sequelize.STRING
    },
    refrigerador: {
        type: Sequelize.BOOLEAN
    }
}, { timestamps: false });

export default Habitaciones;