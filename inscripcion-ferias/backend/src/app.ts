import express from "express";
import feriaRoutes from "./api/feria/feriaRoutes";
import usuarioRoutes from "./api/usuario/usuarioRoutes";
import authRoutes from "./api/auth/authRoutes";
import "reflect-metadata";
import cors from "cors";
var cookieParser = require('cookie-parser');

const app = express();

// Configurar CORS correctamente
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://plumaged-cullen-unrash.ngrok-free.dev",
    "https://inscripcion-ferias.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "ngrok-skip-browser-warning"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// LOG MIDDLEWARE - para debuguear
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Las rutas después de los middlewares
app.use("/feria", feriaRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/auth", authRoutes);

// Ruta catch-all para ver qué se está pidiendo que no existe
app.use((req, res) => {
  console.log(`404 - Ruta no encontrada: ${req.method} ${req.path}`);
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
});

export default app;