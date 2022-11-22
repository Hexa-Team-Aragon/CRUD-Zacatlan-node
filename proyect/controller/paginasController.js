import modeloHotel from '../models/hoteles.js';
import gerente from '../models/gerentes.js';
import db from '../config/db.js';

const paginaInicio = async(req, res) => {
  const hoteles = await modeloHotel.findAll();
  res.render("inicio", {
    pagina: "Inicio",
    hoteles: hoteles,
    selec:"selec",
  });
}

const adminHoteles = async (req, res) => {
  const hoteles = await modeloHotel.findAll();
  res.render("adminHoteles", {
    pagina: "Administración de los hoteles",
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
    pagina: "Registrar Imagenes Hoteles"
  });
}

const pagRegistarImagenesGerentes = async (req,res) => {
  res.render("registrarImagenesGerentes", {
    pagina: "Registrar Imagenes Gerentes"
  });
}

const pagRegistrarImagenesHabitaciones = async (req,res) => {
  res.render("registrarImagenesHabitaciones", {
    pagina: "Registrar Imagenes Habitaciones",
  })
}

export {paginaInicio,adminHoteles,pagGerentes,paginaHabitaciones,crearHoteles,crearGerentes}

