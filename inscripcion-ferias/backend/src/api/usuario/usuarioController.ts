import { type Request, type Response } from "express";
import { usuarioService } from "../../domain/usuario/usuarioService";

export const verPerfil = async (req: Request, res: Response) => {
    
};

export const actualizarPerfil = async (req: Request, res: Response) => {
    
};

export const actualizarCampoUsuario = async (req: Request, res: Response) => {
    try {
        // const id = parseInt(req.params.id!);
        const { id, campo, valor, feriaId } = req.body;
        const usuarioActualizado = await usuarioService.actualizarUsuario(id, campo, valor, feriaId);
        return res.status(200).json(usuarioActualizado);
    } catch(e:any) {
        return res.status(400).json({ error: e.message })
    }
}