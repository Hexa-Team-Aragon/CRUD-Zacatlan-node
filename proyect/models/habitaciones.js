import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const Habitaciones = db.define('habitaciones', {
    id_hbt: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_ht: {
        type: Sequelize.INTEGER
    },
    id_cat:{
        type: Sequelize.INTEGER
    }
}, { timestamps: false });

export default Habitaciones;