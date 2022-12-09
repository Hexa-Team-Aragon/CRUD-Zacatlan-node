import modeloHoteles from '../models/hoteles.js';
import { deleteImagenesHotel, deleteImagenGerente, deleteImagenesHabitacion, deleteImagenHotel } from './eliminarImagenes.js';
import modeloGerente from '../models/gerentes.js';
import modeloHabitacion from '../models/habitaciones.js';
import modeloImgHotel from '../models/imgHoteles.js';
import db from '../config/db.js';

// Metodo para obtener los hoteles
const getHoteles = async (req, res) => {
  const hotel = await modeloHoteles.findByPk(req.query.id);
  try {
    res.render("modificarHotel", {
      pagina: "Editar datos del hotel",
      hotel
    });
  } catch (error) {
    console.log(error);
  }
};

// Metodo que almacena las modificaciones realizadas en un hotel
const putHoteles = async (req, res) => {
  const { nombre, direccion, telefono, correo } = req.body;
  const hotel = await modeloHoteles.findByPk(req.query.id);
  hotel.nombre = nombre;
  hotel.direccion = direccion;
  hotel.telefono = telefono;
  hotel.correo = correo;
  await hotel.save();
  res.redirect('/adminHoteles');
}

// Método que crea y almacena los hoteles
const postHoteles = async (req, res) => {
  const { nombre, direccion, telefono, correo } = req.body;
  console.log(req.body)
  //Almacenar en la base de datos
  try {
    const query = await modeloHoteles.create({
      nombre,
      direccion,
      telefono,
      correo,
    });
    res.json({ id_create: query.null });
  } catch (error) {
    console.log(error);
  }
}

// Metodo para eliminar un hotel
const deleteHoteles = async (req, res) => {
  const idHotel = req.query.id
  const gerente = await db.query(`select * from gerentes where id_ht = ${idHotel};`,
    { model: modeloGerente, mapToModel: true });
  const habitaciones = await db.query(`select * from habitaciones where id_ht = ${idHotel};`,
    { model: modeloHabitacion, mapToModel: true });
  if (gerente.length > 0) {
    await deleteImagenGerente(gerente[0].dataValues.id_gr);
  }
  if (habitaciones.length > 0){
    await habitaciones.map(habitacion => {
      deleteImagenesHabitacion(habitacion.dataValues.id_hbt);
    });  
  }
  await deleteImagenesHotel(idHotel);
  await modeloHoteles.destroy({
    where: {
      id_ht: idHotel
    },
  });
  res.redirect('/adminHoteles');
}

// Metodo para eliminar una imagen de un hotel
const deleteImgHotel = async (req,res) => {
  const idImg = req.query.id_img;
  await deleteImagenHotel(idImg);
  await modeloImgHotel.destroy( {where: {id_img: idImg}} );
  res.redirect(`/adminDetalles?id=${req.query.id}`);
}
 
export { getHoteles, putHoteles, postHoteles, deleteHoteles, deleteImgHotel };