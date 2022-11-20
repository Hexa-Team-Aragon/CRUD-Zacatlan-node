import modeloHoteles from '../models/hoteles.js';
import {deleteImagenesHotel,deleteImagenGerente} from './eliminarImagenes.js';
import modeloGerente from '../models/gerentes.js';
import db from '../config/db.js';

//Metodo para obtener los hoteles
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

//Función que almacena las modificaciones realizadas en un objeto del tipo hotel en caso de que no haya errores
const putHoteles = async (req, res) => {
  const { nombre, direccion, telefono, correo } = req.body;
  const errores = [];
  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre esta vacío" });
  }
  if (direccion.trim() === "") {
    errores.push({ mensaje: "El direccion esta vacío" });
  }
  if (telefono.trim() === "") {
    errores.push({ mensaje: "El telefono esta vacío" });
  }
  if (correo.trim() === "") {
    errores.push({ mensaje: "El correo esta vacío" });
  }
  const hotel = await modeloHoteles.findByPk(req.query.id);
  hotel.nombre = nombre;
  hotel.direccion = direccion;
  hotel.telefono = telefono;
  hotel.correo = correo;
  await hotel.save();
  res.redirect('/hoteles');
}

//Método que crea y almacena los gerentes en caso de que no haya errores
const postHoteles = async (req, res) => {
  const { nombre, direccion, telefono, correo } = req.body;
  const errores = [];
  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre esta vacío" });
  }
  if (direccion.trim() === "") {
    errores.push({ mensaje: "El direccion esta vacío" });
  }
  if (telefono.trim() === "") {
    errores.push({ mensaje: "El telefono esta vacío" });
  }
  if (correo.trim() === "") {
    errores.push({ mensaje: "El correo esta vacío" });
  }
  if (errores.length > 0) {
    res.render("crearHotel", {
      pagina: "Registro de hotel",
      errores,
      nombre,
      direccion,
      telefono,
      correo,
    });
  } else {
    //Almacenar en la base de datos
    try {
     const query = await modeloHoteles.create({
        nombre,
        direccion,
        telefono,
        correo,
      });
      res.redirect(`/pagRegistrarImagenesHoteles?id_create=${query.null}&id_mas=nada`);
    } catch (error) {
      console.log(error);
    }
  }
}

//Función para eliminar un objeto del tipo hotel
const deleteHoteles = async (req, res) => {
  await deleteImagenesHotel(req.query.id);
  const gerente = await db.query(
    `select * from gerentes where id_ht = ${req.query.id};`
    ,{ model: modeloGerente, mapToModel: true });
  await deleteImagenGerente(gerente.id_gr);
  await modeloHoteles.destroy({
    where: {
      id_ht: req.query.id
    },
  });
  res.redirect('/hoteles');
}

export { getHoteles, putHoteles, postHoteles, deleteHoteles };