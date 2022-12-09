import modeloHotel from '../models/hoteles.js';
import modeloGerentesImagenes from '../models/gerentesImganes.js';
import modeloNumHoteles from '../models/numeroHoteles.js';
import modeloImgPublicidad from '../models/imgPublicidad.js';
import db from '../config/db.js';

const paginaInicio = async (req, res) => {
  const numHoteles = await db.query(`select count(*) as n from hoteles as h inner join img_hoteles as img on h.id_ht = img.id_ht;`,
    { model: modeloNumHoteles, mapToModel: true });
  const numero = numHoteles[0].dataValues.n;
  const hoteles = await db.query(`select h.id_ht, h.nombre, img.nombreImagen from hoteles as h inner join img_hoteles as img on h.id_ht = img.id_ht order by img.id_img asc;`,
    { model: modeloImgPublicidad, mapToModel: true });
  let newHoteles = []
  if (numero > 0) {
    let id = -1;
    for (var i = 0; i < numero; i++) {
      if (id != hoteles[i].dataValues.id_ht) {
        newHoteles.push(hoteles[i])
      }
      id = hoteles[i].dataValues.id_ht;
    }
  }
  res.render("inicio", {
    pagina: "Inicio",
    hoteles: newHoteles,
    selec: "selec"
  });
}

const adminHoteles = async (req, res) => {
  const hoteles = await modeloHotel.findAll();
  res.render("adminHoteles", {
    pagina: "Administración de los hoteles",
    hoteles: hoteles,
    rol: req.session.rol,
    selec2: "selec"
  });
}

const crearHoteles = async (req, res) => {
  res.render('crearHotel', {
    pagina: 'Registro de hotel',

  });
}

const pagGerentes = async (req, res) => {
  const gerentes = await db.query(
    `select g.id_gr, g.nombre, g.apellido_paterno, g.apellido_materno, g.telefono, img.id_img, img.nombreImagen from gerentes as g, img_gerentes as img where g.id_gr = img.id_gr;`
    , { model: modeloGerentesImagenes, mapToModel: true });
  res.render("gerentes", {
    pagina: "Gerentes",
    gerentes: gerentes,
    rol: req.session.rol,
    selec3: "selec"
  });
}

const crearGerentes = async (req, res) => {
  const hoteles = await db.query(
    `select * from hoteles where id_ht not in(select id_ht from gerentes);`
    , {
      model: modeloHotel,
      mapToModel: true
    });
  res.render('registrarGerente', {
    pagina: 'Registro de gerente',
    hoteles: hoteles
  });
}

const paginaHabitaciones = (req, res) => {
  res.render("habitaciones", {
    pagina: "Habitaciones",
  });
}

const pagRegistrarImagenesHoteles = async (req, res) => {
  res.render("registrarImagenesHoteles", {
    pagina: "Registrar Imagenes Hoteles",
    idHotel: req.query.id
  });
}

const pagCambiarImagenGerente = async (req, res) => {
  res.render("registrarImagenesGerentes", {
    pagina: "Modificar imagen gerente",
    idGerente: req.query.id_gr,
    idImg: req.query.id_img,
  });
}

const pagRegistrarImagenesHabitaciones = async (req, res) => {
  res.render("registrarImagenesHabitaciones", {
    pagina: "Registrar Imagenes Habitaciones",
    idHabitacion: req.query.id_hbt,
    idHotel: req.query.id_ht
  })
}

export { paginaInicio, adminHoteles, pagGerentes, paginaHabitaciones, crearHoteles, crearGerentes, pagRegistrarImagenesHoteles, pagCambiarImagenGerente, pagRegistrarImagenesHabitaciones }