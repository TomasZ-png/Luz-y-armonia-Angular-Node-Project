import { type Request, type Response } from "express"
import { FavoritoRepository } from "../repository/favorito.repository"
import { FavoritoService } from "../services/favorito.service";

const favoritoRepository = new FavoritoRepository();
const favoritoService = new FavoritoService(favoritoRepository);

export class FavoritoController{

    async getFavoritos(req: Request, res: Response){
        try {
            const idUsuario = Number(req.user?.id);

            if(!idUsuario){
                return res.status(401).json({ error: 'No autenticado' });
            }

            const favoritos = await favoritoService.misFavoritos(idUsuario);

            res.status(200).json(favoritos);
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async agregarAFavoritos(req:Request, res:Response){
        try {
            const idProducto = Number(req.params.id);
            const idUsuario = Number(req.user?.id);

            if(!idUsuario){
                return res.status(401).json({ error: 'No autenticado' });
            }

            const data  = {idUsuario, idProducto}

            const resultado = await favoritoService.agregarAFavoritos(data)
            res.status(200).json(resultado);
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async eliminarDeFavoritos(req: Request, res: Response){
        try {
            const idProducto = Number(req.params.id);
            const idUsuario = Number(req.user?.id);

            if(!idUsuario){
                return res.status(401).json({ error: 'No autenticado' });
            }

            const data  = {idUsuario, idProducto}

            const resultado = await favoritoService.eliminarDeFavoritos(data)
            res.status(200).json(resultado);
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

}