import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const habitacionesCategorias = db.define('habitacionesCategorias', {
    id_hbt: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_ht: {
        type: Sequelize.INTEGER
    },
    id_cat:{
        type: Sequelize.INTEGER
    },
    nombre:{
        type: Sequelize.STRING,
    }
}, { timestamps: false });

export default habitacionesCategorias;