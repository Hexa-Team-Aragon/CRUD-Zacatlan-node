import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const img_habitaciones = db.define('img_habitaciones', {
    id_img: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_hbt: {
        type: Sequelize.INTEGER,
    },
    nombreImagen: {
        type: Sequelize.STRING,
    }
}, { timestamps: false });

export default img_habitaciones;