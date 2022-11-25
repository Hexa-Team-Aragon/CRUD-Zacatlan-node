import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const imgPublicidad = db.define('imgPublicidad', {
    id_ht: {
        type: Sequelize.INTEGER
    },
    nombre: {
        type: Sequelize.STRING
    },
    nombreImagen: {
        type: Sequelize.STRING
    }
}, { timestamps: false });

export default imgPublicidad;