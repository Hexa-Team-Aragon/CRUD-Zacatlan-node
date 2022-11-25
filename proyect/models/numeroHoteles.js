import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const numHoteles = db.define('numeroHoteles', {
    numero: {
        type: Sequelize.INTEGER,
    }
}, { timestamps: false });

export default numHoteles;