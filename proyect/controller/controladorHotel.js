import hoteles from '../models/hoteles.js';

//Función para obtener los hoteles
const getHoteles = async (req, res) => {
  const hotel = await hoteles.findByPk(req.query.id);
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
  const hotel = await hoteles.findByPk(req.query.id);
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
      await hoteles.create({
        nombre,
        direccion,
        telefono,
        correo,
      });
      res.redirect('/hoteles');
    } catch (error) {
      console.log(error);
    }
  }
}

//Función para eliminar un objeto del tipo hotel
const deleteHoteles = async (req, res) => {
  await hoteles.destroy({
    where: {
      id_ht: req.query.id
    },
  });
  res.redirect('/hoteles');
}

export { getHoteles, putHoteles, postHoteles, deleteHoteles };