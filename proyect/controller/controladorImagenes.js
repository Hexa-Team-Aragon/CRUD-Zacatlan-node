import path from 'path';
import fileUpload from "express-fileupload";
import {rutaImagenesDataBases} from '../direcciones.js';
import db from '../config/db.js';

let id = 0;
let id_mas;

const guardarId = async(req,res,next) => {
  id = req.query.id_create;
  id_mas = req.query.id_mas;
  next();
}

const obtenerId = async (req,res,next) => {
  return res.json({id: id}); 
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
    pagina: "Registrar Imagenes Habitaciones"
  })
}

const maximoFiles = (req,res,next) => {
  const files = req.files;
  if (Object.keys(files).length > 1){
    return res.status(400).json({ status: 'Error', message: 'Solo seleccione una imagen' });
  }
  next();
}

const filesPayloadExists = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ status: 'error', message: 'Missing Files' })
  }
  next()
}

const upload = fileUpload({ createParentPath: true })

const postImagenes = (tabla,nombreId,nextRuta) => {
  return async (req, res) => {
    const files = req.files
    Object.keys(files).forEach(async (key) => {
      const filepath = path.join(rutaImagenesDataBases, `${id}-${files[key].name}`);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err })
      })
      await db.query(`insert into ${tabla}(${nombreId},nombreImagen) values(${id},'${id}-${files[key].name}');`);
      /*await modelo.create({
        nombreId: id,
        nombreImagen: files[key].name,
      })*/
    })
    return res.json({ status: 'success', message: Object.keys(files).toString(), ruta: nextRuta, id: id_mas})
  }
}


const MB = 1 //Variable para definir el numero de bytes maximo que puede pesar un archivo
const FILE_SIZE_LIMIT = MB * 1024 * 1024; //Aquie se calculan los bytes
const fileSizeLimiter = (req, res, next) => {
  const files = req.files

  const fileOverLimit = []
  //Que archivos estan fuera del limite
  Object.keys(files).forEach(key => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      fileOverLimit.push(files[key].name)
    }
  })
  if (fileOverLimit.length) {
    const properVerb = fileOverLimit.length > 1 ? 'are' : 'is';

    const sentence = `upload failed. ${fileOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(",", ", ");
    const message = fileOverLimit.length < 3
      ? sentence.replace(",", " and")
      : sentence.replace(/,(?=[^,]*$)/, "and");

    return res.status(413).json({ status: 'error', message });
  }
  next()
}

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files
    const fileExtension = []
    Object.keys(files).forEach(key => {
      fileExtension.push(path.extname(files[key].name))
    })
    const allowed = fileExtension.every(ext => allowedExtArray.includes(ext))
    if (!allowed) {
      const message = `Upload failed. Only ${allowedExtArray.toString()} file allowed`.replaceAll(',', ', ')
      return res.status(422).json({ status: "error", message })
    }
    next()
  }
}

export { pagRegistrarImagenesHoteles, pagRegistarImagenesGerentes, pagRegistrarImagenesHabitaciones , upload, postImagenes, fileExtLimiter, fileSizeLimiter, filesPayloadExists, guardarId,obtenerId,maximoFiles }