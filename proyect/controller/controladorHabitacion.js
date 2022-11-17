import habitaciones from '../models/habitaciones.js';
import hotel from '../models/hoteles.js';
import gerente from '../models/gerentes.js';

//Uso de las variables
let id_habi = 0;
let id_h = 0;

//Función para mostrar todos los detalles del hotel seleccionado
const verMas = async (req, res) => {
  try {
    const h = await hotel.findByPk(req.query.id);
    id_h = h.id_ht;
    
    const g = await gerente.findAll({
      //Porque se almacena en atributes
      attributes: ['id_gr', 'id_ht', 'nombre', 'apellido_paterno', 'apellido_materno', 'telefono'],
      where:{
        id_ht: req.query.id
      }
    });
    const hab = await habitaciones.findAll({
      attributes: ['id_hbt', 'id_ht', 'piso', 'nombre', 'refrigerador'],
      where: {
        id_ht: req.query.id
      }
    });
    
    if (h.id_gr!="null") {
      res.render("verMas", {
        pagina: "Detalles",
        hotel: h,      
        gerentes: g,
        habitaciones: hab
  
      });
    }else{
      res.render("verMas", {
        pagina: "Detalles",
        hotel: h,
        habitaciones: hab
      });
    }
  } catch (error) {
    console.log(error);
  }
}

//Método que crea y almacena las habitaciones en caso de que no haya errores
const postHabitacion = async (req, res) => {
  const { id_ht, piso, nombre, refrigerador } = req.body;
  const errores = [];
  if (piso.trim() === "") {
    errores.push({ mensaje: "Debe definir el piso de la habitación" });
  }
  if (nombre.trim() === "") {
    errores.push({ mensaje: "Debe definir el tipo de habitación" });
  }
  if (errores.length > 0) {
    res.render("crearHabitacion", {
      pagina: "Registro de habitacion",
      errores,
      id_ht,
      piso,
      nombre,
      refrigerador,
    });
  } else {
    //Almacenar en la base de datos
    try {
      let ref = 0
      if (refrigerador === 'on') {
        ref = 1
      } else {
        ref = 0
      }
      await habitaciones.create({
        //
        id_ht: id_h,
        piso,
        nombre,
        refrigerador: ref
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
const cancelarHab= async (req, res) => {
  res.redirect(`/verMas?id=${id_h}`);
};
export {getHabitacion,putHabitacion,deleteHabitacion,verMas,postHabitacion,cancelarHab}