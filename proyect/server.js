import express from 'express'
import morgan from 'morgan'
import db from './config/db.js'
import rutas from './rutas/index.js'

const app = express();


//conexion con la base de datos
db.authenticate()
    .then(() => console.log('conexion exitosa'))
    .catch(error => console.log(error)); 

//defincion del puerto
const port = process.env.PORT || 1800;

//definiendo pug para plantillas
app.set("view engine","pug");
app.use(express.json());

app.use(morgan('tiny'));
app.use(express.urlencoded({extended: false}));
app.use('/',rutas);

//Definiendo carpeta publica
app.use(express.static("public"));

app.listen(port, () => {
  console.log('servidor iniciando en el puerto ' + port);
});