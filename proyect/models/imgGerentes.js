import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const imgGerentes = db.define('img_gerentes', {
    id_img: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    id_gr: {
        type: Sequelize.INTEGER,
    },
    nombreImagen: {
        type: Sequelize.STRING,
    }
}, { timestamps: false });

export default imgGerentes;