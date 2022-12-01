import express from "express";
import {paginaInicio,adminHoteles,pagGerentes,crearHoteles,crearGerentes,pagRegistrarImagenesHoteles,pagCambiarImagenGerente,pagRegistrarImagenesHabitaciones} from '../controller/paginasController.js';
import {getGerentes,putGerente,postGerente,deleteGerente, validarSelector} from '../controller/controladorGerente.js';
import {getHoteles,putHoteles,postHoteles,deleteHoteles,deleteImgHotel} from '../controller/controladorHotel.js';
import {getHabitacion,putHabitacion,deleteHabitacion,verMas,postHabitacion,cancelarHab,paginaCraerHabitacion,validarSelectorCategoria,adminDetalles,pagModificarImgHabitacion,deleteImgHabitacion} from '../controller/controladorHabitacion.js';
import {fileExtLimiter,fileSizeLimiter,postImagenes,upload,filesPayloadExists,maximoFiles,putImagenes} from '../controller/controladorImagenes.js';
import modeloImgGerente from '../models/imgGerentes.js';
import { pagLogin,credenciales } from "../controller/controladorIniciarSesion.js";

const rutas = express.Router();

// rutas login
rutas.get('/',pagLogin);
rutas.post('/credenciales',credenciales);

//ruta para paginas generales 
//rutas.get("/zacatlan",paginaInicio);
rutas.get("/adminHoteles",adminHoteles);
rutas.get("/adminDetalles",adminDetalles);
//rutas.get("/verMas",verMas);
rutas.get('/cancelarHab',cancelarHab);
rutas.post('/validarImagenes',upload,filesPayloadExists,fileExtLimiter(['.png','.jpg','.jpeg']),fileSizeLimiter);

// rutas crud hoteles
rutas.get('/modificarHotel',getHoteles);
rutas.get('/crearHotel',crearHoteles);
rutas.post('/hoteles',postHoteles);
rutas.post('/guardarImagenHotel',upload,postImagenes('img_hoteles','id_ht','/adminHoteles'));
rutas.post('/hoteles/modificar',putHoteles);
rutas.get('/hoteles/eliminar',deleteHoteles);
rutas.get('/hotel/eliminar/imagen',deleteImgHotel);
rutas.get('/pagCrearImagenHotel',pagRegistrarImagenesHoteles);
rutas.post('/crearImagenHotel',upload,filesPayloadExists,fileExtLimiter(['.png','.jpg','.jpeg']),fileSizeLimiter,postImagenes('img_hoteles','id_ht','/adminDetalles'));

// rutas crud gerentes
rutas.get("/gerentes",pagGerentes);
rutas.get('/crearGerente',crearGerentes);
rutas.get('/modificarGerente',getGerentes);
rutas.post('/gerentes/modificar',putGerente);
rutas.get('/gerentes/eliminar',deleteGerente);
rutas.post('/validarSeleccionarHotel',validarSelector);
rutas.post('/validarImagenesGerente',upload,filesPayloadExists,maximoFiles,fileExtLimiter(['.png','.jpg','.jpeg']),fileSizeLimiter);
rutas.post('/gerentes',postGerente);
rutas.post('/guardarImagenGerente',upload,postImagenes('img_gerentes','id_gr','/gerentes'));
rutas.get('/pagCambiarImagenGerente',pagCambiarImagenGerente);
rutas.post('/gerente/modificar/imagen',upload,filesPayloadExists,maximoFiles,fileExtLimiter(['.png','.jpg','.jpeg']),fileSizeLimiter,putImagenes(modeloImgGerente,'/gerentes'));

// rutas crud habitaciones
rutas.get('/crearHabitacion',paginaCraerHabitacion);
rutas.get('/modificarHabitacion',getHabitacion);
rutas.post('/habitacion/modificar',putHabitacion);
rutas.get('/habitacion/eliminar',deleteHabitacion);
rutas.get('/pagina/modificarImg/habitacion',pagModificarImgHabitacion);
rutas.post('/validarSeleccionarHabitacion',validarSelectorCategoria);
rutas.post('/crearHabitacion',postHabitacion);
rutas.post('/guardarImagenHabitacion',upload,postImagenes('img_habitaciones','id_hbt','/adminDetalles'));
rutas.get('/habitacion/eliminar/imagen',deleteImgHabitacion)
rutas.get('/pagCrearImagenHabitacion',pagRegistrarImagenesHabitaciones);
rutas.post('/crearImagenHabitacion',upload,filesPayloadExists,fileExtLimiter(['.png','.jpg','.jpeg']),fileSizeLimiter,postImagenes('img_habitaciones','id_hbt','/pagina/modificarImg/habitacion'));

export default rutas;