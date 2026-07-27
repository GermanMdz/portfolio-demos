import { Router } from "express";
import * as feriaController from "./feriaController";
// import * as inscripcionController from "../";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.get("/", feriaController.obtenerFerias);
router.post("/", adminMiddleware, feriaController.crearFeria);

router.get("/proximas", feriaController.obtenerProximasFerias);
router.post("/inscribir", authMiddleware, feriaController.inscribirUsuarioAFeria);
router.get("/:id/inscripciones", adminMiddleware, feriaController.obtenerInscripciones);
router.get("/:id/inscripciones/llegada", adminMiddleware, feriaController.obtenerListadoPorLlegada);
router.get("/:id/inscripciones/prioridad", adminMiddleware, feriaController.obtenerListadoPorPrioridad);
router.post("/cantidad", feriaController.cantidadFeria);
router.get("/:id", feriaController.obtenerFeriaPorId);
router.patch("/:id", adminMiddleware, feriaController.actualizarFeria);
// router.post("/crear", feriaController.crearFeria);

export default router;


