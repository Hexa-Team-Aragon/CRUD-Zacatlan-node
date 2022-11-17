import hotel from '../models/hoteles.js';
import gerente from '../models/gerentes.js';
import db from '../config/db.js';

const paginaInicio = (req, res) => {
  res.render("inicio", {
    pagina: "Inicio",
    selec:"selec"
  });
}
const pagHoteles = async (req, res) => {
  const hoteles = await hotel.findAll();
  res.render("hoteles", {
    pagina: "Hoteles",
    hoteles: hoteles,
    selec2:"selec"
  });
}
const crearHoteles = async (req, res) => {
  res.render('crearHotel', {
    pagina: 'Registro de hotel',
    
  });
}
const pagGerentes = async (req, res) => {
  const gerentes = await gerente.findAll();
  res.render("gerentes", {
    pagina: "Gerentes",
    gerentes: gerentes,
    selec3:"selec"
  });
}
const crearGerentes = async (req, res) => {
  const hoteles = await db.query(
    `select * from hoteles where id_ht not in(select id_ht from gerentes);`
    , {
      model: hotel,
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

export {
  paginaInicio,
  pagHoteles,
  pagGerentes,
  paginaHabitaciones,
  crearHoteles,
  crearGerentes,
}

