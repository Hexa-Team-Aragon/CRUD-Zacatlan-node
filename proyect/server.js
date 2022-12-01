import express from 'express'
import morgan from 'morgan'
import db from './config/db.js'
import rutas from './rutas/index.js'
import publicidad from './rutas/publicidad.js';
import session from "express-session";
import { nanoid } from "nanoid";

const app = express();

//conexion con la base de datos
db.authenticate()
  .then(() => console.log('conexion exitosa'))
  .catch(error => console.log(error));

//defincion del puerto
const port = process.env.PORT || 1800;

//definiendo pug para plantillas
app.set("view engine", "pug");
app.use(express.json());

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));

//Definiendo carpeta publica
app.use(express.static("public"));

//Rutas pagina publicidad
app.use('/',publicidad);

//definiendo la sesion
app.use(session({
  secret: nanoid(),
  resave: true,
  saveUninitialized: true
}));

//midleware
app.use((req, res, next) => {
  try {
    if (req.url === "/credenciales") {
      return next()
    } else {
      if (req.session.rol === undefined) {
        res.render("login", {
          pagina: "Credenciales"
        });
      } else {
        return next();
      }
    }
  } catch (e) {
    res.render("login", {
      pagina: "Credenciales"
    });
  }
});

app.use('/', rutas);

app.listen(port, () => {
  console.log('servidor iniciando en el puerto ' + port);
});