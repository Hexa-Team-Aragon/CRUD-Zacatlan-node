import sequelize from 'sequelize';

const db = new sequelize('bzgh3rduxcwv3hlxor6l','u6bzllhsjmzxzi8m','o3GOmQQFLImMA0ey1IGw',{
    dialect: 'mysql',
    dialectOptions: {
        host: 'bzgh3rduxcwv3hlxor6l-mysql.services.clever-cloud.com',
        port: '3306',
        timestamps: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000, //Tiempo máximo en que se intentará obtener la conexión antes de generar un error
            idle: 10000 //El tiempo máximo que una conexión puede estar inactiva antes de liberarse
        },
        operatorAlies: false
    }
});

export default db;
