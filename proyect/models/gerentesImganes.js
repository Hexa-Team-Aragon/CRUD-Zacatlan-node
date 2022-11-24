import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const gerentesImagenes = db.define('gerentesImagenes', {
    id_gr: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
    },
    id_img: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombreImagen: {
        type: Sequelize.STRING,
    }
}, { timestamps: false });

export default gerentesImagenes;