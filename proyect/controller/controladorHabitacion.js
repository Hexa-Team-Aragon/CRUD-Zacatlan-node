import modeloHabitaciones from '../models/habitaciones.js';
import modeloHotel from '../models/hoteles.js';
import modeloGerente from '../models/gerentes.js';
import modeloCategoria from '../models/categorias.js';
import modeloHabitacionCategorias from '../models/habitacionCategorias.js';
import modeloImgHotel from '../models/imgHoteles.js';
import modeloImgHabitacion from '../models/imgHabitaciones.js';
import modeloHabitacionCategoriaImg from '../models/habitacionCategoriaImagenes.js';
import { deleteImagenesHabitacion, deleteImagenHabitacion } from './eliminarImagenes.js';
import db from '../config/db.js';

// Metodo para mostrar todos los detalles del hotel seleccionado - pagina ver mas
const verMas = async (req, res) => {
  const idHotel = req.query.id;
  const hotel = await modeloHotel.findByPk(idHotel);
  const imagenesHotel = await db.query(`select * from img_hoteles where id_ht = ${idHotel} order by id_img asc;`,{ model: modeloImgHotel, mapToModel: true });
  const habitaciones = await db.query(`select a.id_cat, a.nombre, b.id_hbt, b.id_ht from categorias as a inner join habitaciones as b on b.id_ht = ${idHotel} where a.id_cat = b.id_cat;`,{ model: modeloHabitacionCategorias, mapToModel: true });
  let lista = []
  for (var i = 0; i < habitaciones.length; i++ ){
    let imgCategoriaN = await db.query(`select a.id_cat, a.nombre, b.id_hbt, b.id_ht, c.nombreImagen from categorias as a inner join habitaciones as b on a.id_cat = b.id_cat inner join img_habitaciones as c on b.id_hbt = c.id_hbt where b.id_ht = ${idHotel} and a.id_cat = ${habitaciones[i].dataValues.id_cat};`,{ model: modeloHabitacionCategoriaImg, mapToModel: true });
    lista.push(imgCategoriaN);
  }
  res.render("verMas", {
    pagina: `${hotel.nombre}`,
    hotel,
    imagenesHotel,
    habitaciones: lista
  });
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
  const habitaciones = await db.query(`select a.id_cat, a.nombre, b.id_hbt, b.id_ht from categorias as a inner join habitaciones as b on b.id_ht = ${idHotel} where a.id_cat = b.id_cat;`
    , { model: modeloHabitacionCategorias, mapToModel: true });
  const imagenesHotel = await db.query(`select * from img_hoteles where id_ht = ${idHotel} order by id_img asc;`
    , { model: modeloImgHotel, mapToModel: true });

  if (hotel.id_gr != "null") {
    res.render("adminDetalles", {
      pagina: `${hotel.nombre}`,
      hotel,
      gerentes,
      habitaciones,
      imagenesHotel,
      rol: req.session.rol,
      isGerente: "si"
    });
  } else {
    res.render("adminDetalles", {
      pagina: `${hotel.nombre}`,
      hotel,
      habitaciones,
      imagenesHotel,
      rol: req.session.rol,
      isGerente: "no"
    });
  }
}

// M??todo que crea y almacena las habitaciones
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
      pagina: "Editar datos de la habitaci??n",
      habitacion,
      categoria,
      categorias,
      idHotel
    });
  } catch (error) {
    console.log(error);
  }
}

// Metodo que almacena las modificaciones realizadas de una habitaci??n
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

// Metodo para cancelar el registro o modificaci??n de una habitaci??n
const cancelarHab = async (req, res) => {
  res.redirect(`/adminDetalles?id=${req.query.id_hotel}`);
};


// Metodo que muestra el formulario de registrar habitacion
const paginaCraerHabitacion = async (req, res) => {
  const categorias = await db.query(
    `select * from categorias where id_cat not in(select id_cat from habitaciones where id_ht = ${req.query.id});`
    , { model: modeloCategoria, mapToModel: true });
  res.render('crearHabitacion', {
    pagina: 'Registro de habitaci??n',
    categorias,
    idHotel: req.query.id
  });
};

// Metodo que muestra la pagina de modificar imagenes habitacion
const pagModificarImgHabitacion = async (req, res) => {
  const idHabitacion = req.query.id_hbt;
  const idHotel = req.query.id_ht;
  const imgHabitacion = await db.query(`select * from img_habitaciones where id_hbt = ${idHabitacion};`
    , { model: modeloImgHabitacion, mapToModel: true });
  res.render("modificarImgHabitacion", {
    pagina: "Imagenes habitacion",
    imgHabitacion,
    idHabitacion,
    idHotel,
    rol: req.session.rol
  })
}

// Metodo para eliminar una imagen de una habitacion
const deleteImgHabitacion = async (req, res) => {
  const idImg = req.query.id_img;
  await deleteImagenHabitacion(idImg);
  await modeloImgHabitacion.destroy({ where: { id_img: idImg } });
  res.redirect('back');
}

export { getHabitacion, putHabitacion, deleteHabitacion, verMas, postHabitacion, cancelarHab, paginaCraerHabitacion, validarSelectorCategoria, adminDetalles, pagModificarImgHabitacion, deleteImgHabitacion }