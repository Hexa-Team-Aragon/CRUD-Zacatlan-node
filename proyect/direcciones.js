import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const rutaImagenesDataBases = path.dirname(__filename)+'/public/img-data-bases'
const rutaImgGerentes = path.dirname(__filename)+'/public/img-data-bases/gerentes'
const rutaImgHoteles = path.dirname(__filename)+'/public/img-data-bases/hoteles'
const rutaImghabitaciones = path.dirname(__filename)+'/public/img-data-bases/habitaciones'

export {rutaImagenesDataBases,rutaImgHoteles,rutaImgGerentes,rutaImghabitaciones}