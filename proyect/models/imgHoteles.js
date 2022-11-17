import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const imgHoteles = db.define('img_hoteles', {
    id_img: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_ht: {
        type: Sequelize.INTEGER,
    },
    nombreImagen: {
        type: Sequelize.STRING,
    }
}, { timestamps: false });

export default imgHoteles;