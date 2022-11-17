import modeloGerentes from '../models/gerentes.js';
import modeloHotel from '../models/hoteles.js';
import db from '../config/db.js';

const getGerentes = async (req, res) => {
  const gerente = await modeloGerentes.findByPk(req.query.id);
  const hotel = await modeloHotel.findByPk(gerente.id_ht);
  const selectHoteles = await db.query(
    `select * from hoteles where id_ht not in(select id_ht from gerentes);`
    , {
      model: modeloHotel, //Esto le permite asignar fácilmente una consulta al modelo predefinido
      mapToModel: true //Traduce los nombres de los campos devueltos al equivalente en el modelo proporcionado
    });
  try {
    res.render("modificarGerente", {
      pagina: "Editar datos del gerente",
      gerente,
      hotel,
      selectHoteles
    });
  } catch (error) {
    console.log(error);
  }
};

//Método que crea y almacena los gerentes 
const postGerente = async (req, res) => {
  const { id_ht, nombre, apellido_paterno, apellido_materno, telefono } = req.body;
  const errores = [];
  if (id_ht === "sin seleccionar") {
    errores.push({ mensaje: "No has seleccionado un hotel" })
  }
  if (errores > 0) {
    const hoteles = await db.query(
      `select * from hoteles where id_ht not in(select id_ht from gerentes);`
      , {
        model: modeloHotel,
        mapToModel: true
      });
    res.render("registrarGerente", {
      pagina: "Registro de gerente",
      errores,
      hoteles,
      nombre,
      apellido_paterno,
      apellido_materno,
      telefono
    });
  } else {
    //Almacenar en la base de datos
    try {
      await modeloGerentes.create({
        id_ht,
        nombre,
        apellido_paterno,
        apellido_materno,
        telefono
      });
      res.redirect('/gerentes');
    } catch (error) {
      console.log(error);
    }
  }

}

//Metodo que almacena las modificaciones de gerente
const putGerente = async (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, telefono, id_ht } = req.body;
  const errores = [];
  if (id_ht < 0) {
    errores.push({ mensaje: "El nombre del hotel esta vacío" })
  }
  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre esta vacío" });
  }
  if (apellido_paterno.trim() === "") {
    errores.push({ mensaje: "El apellido paterno esta vacío" });
  }
  if (apellido_materno.trim() === "") {
    errores.push({ mensaje: "El apellido materno esta vacío" });
  }
  if (telefono.trim() === "") {
    errores.push({ mensaje: "El telefono esta vacio" });
  }
  if (errores.length > 0) {
    res.render("modificarGerente", {
      pagina: "Editar datos del gerente",
      errores,
      nombre,
      apellido_paterno,
      apellido_materno,
      telefono,
    });
  } else {
    const gerente = await modeloGerentes.findByPk(req.query.id);
    gerente.id_ht = id_ht;
    gerente.nombre = nombre;
    gerente.apellido_paterno = apellido_paterno;
    gerente.apellido_materno = apellido_materno;
    gerente.telefono = telefono;
    await gerente.save();
    res.redirect('/gerentes');
  }
}

//Función para eliminar un objeto del tipo gerente
const deleteGerente = async (req, res) => {
  await gerentes.destroy({
    where: {
      id_gr: req.query.id
    },
  });
  res.redirect('/gerentes');
}

export { getGerentes, postGerente, putGerente, deleteGerente };