import { paginaInicio } from "../controller/paginasController.js";
import { verMas } from "../controller/controladorHabitacion.js";
import express from "express";

const publicidad = express.Router();

publicidad.get("/",paginaInicio);
publicidad.get("/verMas",verMas);

export default publicidad;