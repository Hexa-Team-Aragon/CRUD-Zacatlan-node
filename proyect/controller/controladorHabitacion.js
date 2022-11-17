import modeloHabitaciones from '../models/habitaciones.js';
import modeloHotel from '../models/hoteles.js';
import modeloGerente from '../models/gerentes.js';
import modeloCategoria from '../models/categorias.js';

//Uso de las variables
let id_habi = 0;
let id_h = 0;

//Metodo para mostrar todos los detalles del hotel seleccionado - pagina ver mas
const verMas = async (req, res) => {
  const hotel = await modeloHotel.findByPk(req.query.id);
  const gerentes = await modeloGerente.findAll({
    attributes: ['id_gr', 'id_ht', 'nombre', 'apellido_paterno', 'apellido_materno', 'telefono'],
    where: { id_ht: req.query.id }
  });
  const habitaciones = await modeloHabitaciones.findAll({
    attributes: ['id_hbt', 'id_ht', 'id_cat'],
    where: { id_ht: req.query.id }
  });

  id_h = hotel.id_ht;

  if (hotel.id_gr != "null") {
    res.render("verMas", {
      pagina: "Detalles",
      hotel,
      gerentes,
      habitaciones
    });
  } else {
    res.render("verMas", {
      pagina: "Detalles",
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
      await modeloHabitaciones.create({
        id_ht: id_h,
        id_cat: categoriaSeleccionada
      });
      res.redirect(`/verMas?id=${id_h}`);
    } catch (error) {
      console.log(error);
    }
  }
};

//Función para obtener los datos de la habitacion
const getHabitacion = async (req, res) => {
  const hab = await habitaciones.findByPk(req.query.id);
  id_h = hab.id_ht;
  id_habi = hab.id_hbt;
  try {
    res.render("modificarHabitacion", {
      pagina: "Editar datos de la habitación",
      habitacion: hab
    });
  } catch (error) {
    console.log(error);
  }
}

//Función que almacena las modificaciones realizadas en un objeto del tipo habitación en caso de que no haya errores
const putHabitacion = async (req, res) => {
  const { piso, nombre, refrigerador } = req.body;
  const errores = [];
  if (piso.trim() === "") {
    errores.push({ mensaje: "El piso no debe ser vacío" });
  }
  if (nombre.trim() === "") {
    errores.push({ mensaje: "La nombre no debe ser vacío" });
  }
  if (errores.length > 0) {
    res.render("modificarHabitacion", {
      pagina: "Editar datos de la habitación",
      piso,
      nombre
    });
  } else {
    //Modificar en la base de datos

    try {
      let ref = 0
      if (refrigerador === 'on') {
        ref = 1
      } else {
        ref = 0
      }

      const habitacion = await habitaciones.findByPk(id_habi);
      habitacion.piso = piso;
      habitacion.nombre = nombre;
      habitacion.refrigerador = ref;
      await habitacion.save();
      res.redirect(`/verMas?id=${id_h}`);
    } catch (error) {
      console.log(error);
    }
  }
};

//Función para eliminar un objeto del tipo habitación
const deleteHabitacion = async (req, res) => {
  try {
    await habitaciones.destroy({
      where: {
        id_hbt: req.query.id
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect(`/verMas?id=${id_h}`);
};

//Función para cancelar el registro o modificación de una habitación
const cancelarHab = async (req, res) => {
  res.redirect(`/verMas?id=${id_h}`);
};

const paginaCraerHabitacion = async (req,res) => {
  const categorias = await modeloCategoria.findAll();
  res.render('crearHabitacion', {
    pagina: 'Registro de habitación',
    categorias,
  });
};

export { getHabitacion, putHabitacion, deleteHabitacion, verMas, postHabitacion, cancelarHab, paginaCraerHabitacion }