import { Router } from "express";
import * as usuarioController from "./usuarioController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/perfil", usuarioController.verPerfil);
router.post("/perfil", usuarioController.actualizarPerfil);
router.put("/actualizar", authMiddleware ,usuarioController.actualizarCampoUsuario);

export default router;

