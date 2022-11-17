import express from "express";
import {paginaInicio,pagHoteles,pagGerentes,paginaHabitaciones,crearHoteles,crearGerentes} from '../controller/paginasController.js';
import {getGerentes,putGerente,postGerente,deleteGerente} from '../controller/controladorGerente.js';
import {getHoteles,putHoteles,postHoteles,deleteHoteles} from '../controller/controladorHotel.js';
import {getHabitacion,putHabitacion,deleteHabitacion,verMas,postHabitacion,cancelarHab,paginaCraerHabitacion} from '../controller/controladorHabitacion.js';


const rutas = express.Router();

//ruta para las páginas
rutas.get("/", paginaInicio);
rutas.get("/hoteles",pagHoteles);
rutas.get("/gerentes",pagGerentes);
rutas.get("/pagHabitaciones",paginaHabitaciones);
rutas.get("/verMas",verMas);
// rutas crud hoteles
rutas.get('/modificarHotel',getHoteles);
rutas.get('/crearHotel',crearHoteles);
rutas.post('/hoteles',postHoteles);
rutas.post('/hoteles/modificar',putHoteles);
rutas.get('/hoteles/eliminar',deleteHoteles);
// rutas crud gerentes
rutas.get('/crearGerente',crearGerentes);
rutas.get('/modificarGerente',getGerentes);
rutas.post('/gerentes',postGerente);
rutas.post('/gerentes/modificar',putGerente);
rutas.get('/gerentes/eliminar',deleteGerente);
// rutas crud habitaciones
rutas.get('/crearHabitacion',paginaCraerHabitacion);
rutas.post('/crearHabitacion',postHabitacion);
rutas.get('/modificarHabitacion',getHabitacion);
rutas.post('/habitacion/modificar',putHabitacion);
rutas.get('/habitacion/eliminar',deleteHabitacion);
rutas.get('/cancelarHab',cancelarHab);

export default rutas;