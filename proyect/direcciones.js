import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const rutaImagenesDataBases = path.dirname(__filename)+'\\public\\img-data-bases'

export {rutaImagenesDataBases}