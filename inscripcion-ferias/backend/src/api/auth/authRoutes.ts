import { Router } from "express";
import * as authController from "./authController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.post("/me", authMiddleware, authController.me);

export default router;


