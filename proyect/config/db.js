import sequelize from 'sequelize';

const db = new sequelize('gestorhotelesv2','root','123456',{
    dialect: 'mariadb',
    dialectOptions: {
        host: '127.0.0.1',
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