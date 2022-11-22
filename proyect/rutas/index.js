import express from "express";
import {paginaInicio,adminHoteles,pagGerentes,crearHoteles,crearGerentes} from '../controller/paginasController.js';
import {getGerentes,putGerente,postGerente,deleteGerente, validarSelector} from '../controller/controladorGerente.js';
import {getHoteles,putHoteles,postHoteles,deleteHoteles} from '../controller/controladorHotel.js';
import {getHabitacion,putHabitacion,deleteHabitacion,verMas,postHabitacion,cancelarHab,paginaCraerHabitacion,validarSelectorCategoria,adminDetalles} from '../controller/controladorHabitacion.js';
import {fileExtLimiter,fileSizeLimiter,postImagenes,upload,filesPayloadExists,maximoFiles} from '../controller/controladorImagenes.js';

const rutas = express.Router();

//ruta para paginas generales 
rutas.get("/", paginaInicio);
rutas.get("/adminHoteles",adminHoteles);
rutas.get("/adminDetalles",adminDetalles);
rutas.get("/gerentes",pagGerentes);
rutas.get("/verMas",verMas);
// rutas crud hoteles
rutas.get('/modificarHotel',getHoteles);
rutas.get('/crearHotel',crearHoteles);
rutas.post('/hoteles/modificar',putHoteles);
rutas.get('/hoteles/eliminar',deleteHoteles);
// rutas crud gerentes
rutas.get('/crearGerente',crearGerentes);
rutas.get('/modificarGerente',getGerentes);
rutas.post('/gerentes/modificar',putGerente);
rutas.get('/gerentes/eliminar',deleteGerente);
// rutas crud habitaciones
rutas.get('/crearHabitacion',paginaCraerHabitacion);
rutas.get('/modificarHabitacion',getHabitacion);
rutas.post('/habitacion/modificar',putHabitacion);
rutas.get('/habitacion/eliminar',deleteHabitacion);
rutas.get('/cancelarHab',cancelarHab);

// rutas imagenes
rutas.post('/validarImagenes',upload,filesPayloadExists,fileExtLimiter(['.png','.jpg','.jpeg']),fileSizeLimiter);
// rutas guardar hotel y imagen
rutas.post('/hoteles',postHoteles);
rutas.post('/guardarImagenHotel',upload,postImagenes('img_hoteles','id_ht','/adminHoteles'));
// rutas guardar gerente y imagen
rutas.post('/validarSeleccionarHotel',validarSelector);
rutas.post('/validarImagenesGerente',upload,filesPayloadExists,maximoFiles,fileExtLimiter(['.png','.jpg','.jpeg']),fileSizeLimiter);
rutas.post('/gerentes',postGerente);
rutas.post('/guardarImagenGerente',upload,postImagenes('img_gerentes','id_gr','/gerentes'));
// rutas guardar habitacion y imagen
rutas.post('/validarSeleccionarHabitacion',validarSelectorCategoria);
rutas.post('/crearHabitacion',postHabitacion);
rutas.post('/guardarImagenHabitacion',upload,postImagenes('img_habitaciones','id_hbt','/adminDetalles'));

export default rutas;