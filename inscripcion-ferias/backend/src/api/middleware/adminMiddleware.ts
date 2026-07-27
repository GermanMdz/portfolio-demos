import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token no enviado" });
  }

  const token = authHeader.split(" ")[1]!;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload;
    if((req as any).user.role !== 'admin') {
      return res.status(403).json({ error: "Acceso denegado: se requieren privilegios de administrador" });
    }
    next();
  } catch (err) {
    // Por ahora envio un mensaje, pero deberia especificar el error real
    return res.status(401).json({ error: "Pruebe iniciar sesión nuevamente" });
  }
}
