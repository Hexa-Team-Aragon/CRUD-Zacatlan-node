import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const Categorias = db.define('categorias', {
    id_cat:{
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    nombre:{
        type: Sequelize.STRING,
    }
}, { timestamps: false });

export default Categorias;