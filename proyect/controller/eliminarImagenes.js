import { promises as fs } from 'fs';
import { rutaImagenesDataBases } from '../direcciones.js';
import modeloImgGerente from '../models/imgGerentes.js';
import modeloImgHotel from '../models/imgHoteles.js';
import modeloImgHabitacion from '../models/imgHabitaciones.js';

const deleteImagenGerente = async (idGerente) => {
  const img = await modeloImgGerente.findByPk(idGerente);
  try {
    await fs.unlink(`${rutaImagenesDataBases}/${img.nombreImagen}`);
    console.log(`Imagen ${ïmg.nombreImagen} eliminada`);
  } catch (err) {
    console.log('Error no se elimino la imagen');
  }
}

const deleteImagenesHotel = async (idHotel) => {
  const img_hoteles = await modeloImgHotel.findAll({
    where: {id_ht: idHotel}
  });
  await img_hoteles.map(img => {
    try {
      fs.unlink(`${rutaImagenesDataBases}/${img.nombreImagen}`);
      console.log(`Imagen ${ïmg.nombreImagen} eliminada`);
    } catch (err) {
      console.log('Error no se elimino la imagen');
    }
  });
}

const deleteImagenesHabitacion = async (idHabitacion) => {
  const img_habitaciones = await modeloImgHabitacion.findAll({
    where: {id_hbt: idHabitacion}
  });
  await img_habitaciones.map(img => {
    try {
      fs.unlink(`${rutaImagenesDataBases}/${img.nombreImagen}`);
      console.log(`Imagen ${img.nombreImagen} eliminada`);
    } catch (err) {
      console.log(err);
    }
  })
}

export {deleteImagenGerente,deleteImagenesHotel,deleteImagenesHabitacion}