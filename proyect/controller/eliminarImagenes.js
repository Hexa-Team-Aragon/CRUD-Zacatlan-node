import { promises as fs } from 'fs';
import { rutaImagenesDataBases, rutaImgGerentes, rutaImghabitaciones, rutaImgHoteles } from '../direcciones.js';
import modeloImgGerente from '../models/imgGerentes.js';
import modeloImgHotel from '../models/imgHoteles.js';
import modeloImgHabitacion from '../models/imgHabitaciones.js';
import db from '../config/db.js';


// Metodo que elimina una imagen de img-data-bases
const deleteImg = async(nombreImagen,ruta) => {
  try {
    await fs.unlink(`${ruta}/${nombreImagen}`);
  } catch (err) {
    console.log(err);
  }
} 

// Metodo que elimina la imagen del gerente de img-data-bases
const deleteImagenGerente = async (idGerente) => {
  const img = await db.query( `select * from img_gerentes where id_gr = ${idGerente}`
    ,{ model: modeloImgGerente, mapToModel: true });
  try {
    await fs.unlink(`${rutaImgGerentes}/${img[0].dataValues.nombreImagen}`);
  } catch (err) {
    console.log(err);
  }
}

// Metodo que elimina todas las imagenes del hotel de img-data-bases
const deleteImagenesHotel = async (idHotel) => {
  const img_hoteles = await modeloImgHotel.findAll({
    where: {id_ht: idHotel}
  });
  await img_hoteles.map(img => {
    try {
      fs.unlink(`${rutaImgHoteles}/${img.nombreImagen}`);
    } catch (err) {
      console.log(err);
    }
  });
}

// Metodo que elimina una imagen de un hotel de img-data-bases
const deleteImagenHotel = async (idImg) => {
  const imgHotel = await modeloImgHotel.findByPk(idImg);
  try {
    await fs.unlink(`${rutaImgHoteles}/${imgHotel.nombreImagen}`);
  } catch (error) {
    console.log(error)
  }
}

// Metodo que elimina todas las imagenes de un habitacion de img-data-bases
const deleteImagenesHabitacion = async (idHabitacion) => {
  const img_habitaciones = await modeloImgHabitacion.findAll({
    where: {id_hbt: idHabitacion}
  });
  await img_habitaciones.map(img => {
    try {
      fs.unlink(`${rutaImghabitaciones}/${img.nombreImagen}`);
    } catch (err) {
      console.log(err);
    }
  })
}

// Metodo que elimina una imagen de una habitacion de img-data-bases
const deleteImagenHabitacion = async (idImg) => {
  const imgHabitacion = await modeloImgHabitacion.findByPk(idImg);
  try {
    await fs.unlink(`${rutaImghabitaciones}/${imgHabitacion.nombreImagen}`);
  }catch(error){
    console.log(error);
  }
}

export {deleteImagenGerente,deleteImagenesHotel,deleteImagenesHabitacion,deleteImagenHotel,deleteImagenHabitacion,deleteImg}