import path from 'path';
import fileUpload from "express-fileupload";
import {rutaImagenesDataBases} from '../direcciones.js';
import {deleteImagenGerente} from './eliminarImagenes.js'
import db from '../config/db.js';

const maximoFiles = (req,res,next) => {
  const files = req.files;
  if (Object.keys(files).length > 1){
    return res.status(400).json({ status: 'error', message: 'Solo seleccione una imagen' });
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
    const idCreate = req.query.id_create;
    const files = req.files
    Object.keys(files).forEach(async (key) => {
      const filepath = path.join(rutaImagenesDataBases, `${idCreate}-${files[key].name}`);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err })
      })
      await db.query(`insert into ${tabla}(${nombreId},nombreImagen) values(${idCreate},'${idCreate}-${files[key].name}');`);
    })
    return res.json({ status: 'success', message: Object.keys(files).toString(), ruta: nextRuta})
  }
}

const putImagenes = (modelo,nextRuta) => {
  return async (req, res) => {
    const id = req.query.id;
    const idImg = req.query.id_img;
    const files = req.files;
    await deleteImagenGerente(id);
    Object.keys(files).forEach(async(key) => {
      const filepath = path.join(rutaImagenesDataBases, `${id}-${files[key].name}`);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err })
      })
      const imgGerente = await modelo.findByPk(idImg);
      imgGerente.nombreImagen = `${id}-${files[key].name}`;
      await imgGerente.save()
    })
    return res.json({ status: 'success', message: Object.keys(files).toString(), ruta: nextRuta})
  }
}

const MB = 1 //Variable para definir el numero de bytes maximo que puede pesar un archivo
const FILE_SIZE_LIMIT = MB * 1024 * 1024; //Aquie se calculan los bytes
const fileSizeLimiter = (req, res, next) => {
  const files = req.files;
  const fileOverLimit = [];
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
  console.log('entro')
  if (req.query.directo == 'pasa'){
    next();
  }else{
    return res.json({ status: 'Correcto'});
  }
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

export { upload,postImagenes,fileExtLimiter,fileSizeLimiter,filesPayloadExists,maximoFiles,putImagenes }