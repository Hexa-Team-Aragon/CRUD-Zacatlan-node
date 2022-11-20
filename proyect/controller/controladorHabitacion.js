import modeloHabitaciones from '../models/habitaciones.js';
import modeloHotel from '../models/hoteles.js';
import modeloGerente from '../models/gerentes.js';
import modeloCategoria from '../models/categorias.js';
import modeloHabitacionCategorias from '../models/habitacionCategorias.js';
import {deleteImagenesHabitacion} from './eliminarImagenes.js';
import db from '../config/db.js';

//Metodo para mostrar todos los detalles del hotel seleccionado - pagina ver mas
const verMas = async (req, res) => {
  const hotel = await modeloHotel.findByPk(req.query.id);
  const gerentes = await modeloGerente.findAll({
    attributes: ['id_gr', 'id_ht', 'nombre', 'apellido_paterno', 'apellido_materno', 'telefono'],
    where: { id_ht: req.query.id }
  });
  const habitaciones= await db.query(
    `select * from categorias a inner join habitaciones b on b.id_ht = ${req.query.id} where a.id_cat = b.id_cat;`
    ,{ model: modeloHabitacionCategorias, mapToModel: true });
  if (hotel.id_gr != "null") {
    res.render("verMas", {
      pagina: `Detalles ${hotel.nombre}`,
      hotel,
      gerentes,
      habitaciones
    });
  } else {
    res.render("verMas", {
      pagina: `Detalles ${hotel.nombre}`,
      hotel,
      habitaciones
    });
  }
}

//Método que crea y almacena las habitaciones
const postHabitacion = async (req, res) => {
  const { categoriaSeleccionada } = req.body;
  const errores = [];
  if (categoriaSeleccionada === "sin seleccionar") {
    errores.push({ mensaje: "Debe seleccionar una categoria" });
  }
  if (errores.length > 0) {
    const categorias = await modeloCategoria.findAll();
    res.render("crearHabitacion", {
      pagina: "Registro de habitacion",
      errores,
      categorias
    });
  } else {
    try {
      const query = await modeloHabitaciones.create({
        id_ht: req.query.id,
        id_cat: categoriaSeleccionada,
      });
      //res.redirect(`/verMas?id=${req.query.id}`);
      res.redirect(`/pagRegistrarImagenesHabitaciones?id_create=${query.null}&id_mas=${req.query.id}`);
    } catch (error) {
      console.log(error);
    }
  }
};

//Metodo para obtener una habitacion por su id
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

//Metodo que almacena las modificaciones realizadas de una habitación
const putHabitacion = async (req, res) => {
  const { categoriaSeleccionada } = req.body;
  //Modificar en la base de datos
  try {
    const habitacion = await modeloHabitaciones.findByPk(req.query.id_habitacion);
    console.log(categoriaSeleccionada)
    habitacion.id_cat = categoriaSeleccionada
    await habitacion.save();
    res.redirect(`/verMas?id=${req.query.id_hotel}`);
  } catch (error) {
    console.log(error);
  }
}

//Metodo para eliminar una habitacion
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
  res.redirect(`/verMas?id=${req.query.id_hotel}`);
};

//Función para cancelar el registro o modificación de una habitación
const cancelarHab = async (req, res) => {
  res.redirect(`/verMas?id=${req.query.id_hotel}`);
};

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

export { getHabitacion, putHabitacion, deleteHabitacion, verMas, postHabitacion, cancelarHab, paginaCraerHabitacion }