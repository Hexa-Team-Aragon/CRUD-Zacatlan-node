import modeloHabitaciones from '../models/habitaciones.js';
import modeloHotel from '../models/hoteles.js';
import modeloGerente from '../models/gerentes.js';
import modeloCategoria from '../models/categorias.js';
import modeloHabitacionCategorias from '../models/habitacionCategorias.js';
import modeloImgHotel from '../models/imgHoteles.js';
import modeloImgHabitacion from '../models/imgHabitaciones.js';
import { deleteImagenesHabitacion } from './eliminarImagenes.js';
import db from '../config/db.js';

// Metodo para mostrar todos los detalles del hotel seleccionado - pagina ver mas
const verMas = async (req, res) => {
  const hotel = await modeloHotel.findByPk(req.query.id);
  const gerentes = await modeloGerente.findAll({
    attributes: ['id_gr', 'id_ht', 'nombre', 'apellido_paterno', 'apellido_materno', 'telefono'],
    where: { id_ht: req.query.id }
  });
  const habitaciones = await db.query(
    `select a.id_cat, a.nombre, b.id_hbt, b.id_ht from categorias as a inner join habitaciones as b on b.id_ht = ${req.query.id} where a.id_cat = b.id_cat;`
    , { model: modeloHabitacionCategorias, mapToModel: true });
  if (hotel.id_gr != "null") {
    res.render("verMas", {
      pagina: `${hotel.nombre}`,
      hotel,
      gerentes,
      habitaciones
    });
  } else {
    res.render("verMas", {
      pagina: `${hotel.nombre}`,
      hotel,
      habitaciones
    });
  }
}

// Middleware que valida si se selecciona un hotel
const validarSelectorCategoria = async (req, res) => {
  const { id_cat } = req.body;
  if (id_cat == "sin seleccionar") {
    return res.json({ status: 'error', message: 'Selecciona un hotel' });
  } else {
    return res.json({ status: 'Correcto', message: 'Se selecciono un hotel' });
  }
}

// Metodo que muestra admDetalles
const adminDetalles = async (req, res) => {
  const idHotel = req.query.id;
  const hotel = await modeloHotel.findByPk(req.query.id);
  const gerentes = await modeloGerente.findAll({
    attributes: ['id_gr', 'id_ht', 'nombre', 'apellido_paterno', 'apellido_materno', 'telefono'],
    where: { id_ht: idHotel }
  });
  const habitaciones = await db.query(
    `select a.id_cat, a.nombre, b.id_hbt, b.id_ht from categorias as a inner join habitaciones as b on b.id_ht = ${idHotel} where a.id_cat = b.id_cat;`
    , { model: modeloHabitacionCategorias, mapToModel: true });
  const imagenesHotel = await db.query(
    `select * from img_hoteles where id_ht = ${idHotel};`
    , { model: modeloImgHotel, mapToModel: true });

  if (hotel.id_gr != "null") {
    res.render("adminDetalles", {
      pagina: `${hotel.nombre}`,
      hotel,
      gerentes,
      habitaciones,
      imagenesHotel
    });
  } else {
    res.render("adminDetalles", {
      pagina: `${hotel.nombre}`,
      hotel,
      habitaciones,
      imagenesHotel
    });
  }
}

// Método que crea y almacena las habitaciones
const postHabitacion = async (req, res) => {
  const { id_cat } = req.body;
  try {
    const query = await modeloHabitaciones.create({
      id_ht: req.query.id,
      id_cat: id_cat,
    });
    res.json({ id_create: query.null });
  } catch (error) {
    console.log(error);
  }
};

// Metodo para obtener una habitacion por su id
const getHabitacion = async (req, res) => {
  const habitacion = await modeloHabitaciones.findByPk(req.query.id_habitacion);
  const categorias = await db.query(
    `select * from categorias where id_cat not in(select id_cat from habitaciones where id_ht = ${req.query.id_hotel});`
    , { model: modeloCategoria, mapToModel: true });
  const categoria = await modeloCategoria.findByPk(habitacion.id_cat);
  const idHotel = req.query.id_hotel;
  try {
    res.render(`modificarHabitacion`, {
      pagina: "Editar datos de la habitación",
      habitacion,
      categoria,
      categorias,
      idHotel
    });
  } catch (error) {
    console.log(error);
  }
}

// Metodo que almacena las modificaciones realizadas de una habitación
const putHabitacion = async (req, res) => {
  const { categoriaSeleccionada } = req.body;
  try {
    
    const habitacion = await modeloHabitaciones.findByPk(req.query.id_habitacion);
    habitacion.id_cat = categoriaSeleccionada
    await habitacion.save();
    res.redirect(`/adminDetalles?id=${req.query.id_hotel}`);
  } catch (error) {
    console.log(error);
  }
}

// Metodo para eliminar una habitacion
const deleteHabitacion = async (req, res) => {
  await deleteImagenesHabitacion(req.query.id_habitacion);
  try {
    await modeloHabitaciones.destroy({
      where: {
        id_hbt: req.query.id_habitacion
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect(`/adminDetalles?id=${req.query.id_hotel}`);
};

// Metodo para cancelar el registro o modificación de una habitación
const cancelarHab = async (req, res) => {
  res.redirect(`/adminDetalles?id=${req.query.id_hotel}`);
};

// Metodo que muestra el formulario de registrar habitacion
const paginaCraerHabitacion = async (req, res) => {
  const categorias = await db.query(
    `select * from categorias where id_cat not in(select id_cat from habitaciones where id_ht = ${req.query.id});`
    , { model: modeloCategoria, mapToModel: true });
  res.render('crearHabitacion', {
    pagina: 'Registro de habitación',
    categorias,
    idHotel: req.query.id
  });
};

// Metodo que muestra la pagina de modificar imagenes habitacion
const pagModificarImgHabitacion = async (req, res) => {
  const idHabitacion = req.query.id_hbt;
  const imgHabitacion = await db.query(`select * from img_habitaciones where id_hbt = ${idHabitacion};`
    , { model: modeloImgHabitacion, mapToModel: true });
  res.render("modificarImgHabitacion",{
    pagina: "Imagenes habitacion",
    imgHabitacion
  })
}

export { getHabitacion, putHabitacion, deleteHabitacion, verMas, postHabitacion, cancelarHab, paginaCraerHabitacion, validarSelectorCategoria, adminDetalles, pagModificarImgHabitacion }