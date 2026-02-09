import { type Request, type Response } from "express"
import { ReseniaRepository } from "../repository/resenia.repository";
import { ReseniaService } from "../services/resenia.service";
import { ProductoRepository } from "../repository/producto.repository";

const reseniaRepository = new ReseniaRepository();
const productoRepository = new ProductoRepository();
const reseniaService = new ReseniaService(reseniaRepository, productoRepository);

export class ReseniaController{

    async createResenia(req: Request, res: Response){
        try {
            const idUsuario = Number(req.user?.id);

            if(!idUsuario){
                res.status(400).json('Usuario no logueado');
            }
            
            const idProducto = Number(req.params.id);
            const { calificacion, comentario } = req.body;
            const nuevaResenia = { idUsuario, idProducto, calificacion, comentario }

            const resenia = await reseniaService.createResenia(nuevaResenia);
            res.status(200).json(resenia);
        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
    }

    async getReseniaByProduct(req: Request, res: Response){
        try {
            const idProducto = Number(req.params.id);

            const resenias = await reseniaService.getReseniaByProduct(idProducto);

            res.status(200).json(resenias);
        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
    }
}