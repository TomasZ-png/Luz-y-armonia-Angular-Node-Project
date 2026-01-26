import { type Request, type Response } from "express"
import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { CarritoService } from "../services/carrito.service";

const carritoRepository = new MiCarritoRepository();
const carritoService = new CarritoService(carritoRepository);

export class CarritoController{

    async getCarritoByUserId(req:Request, res:Response){
        try {
            const idUsuario = req.user?.id;
            
            if (!idUsuario) {
                return res.status(401).json({ error: 'No autenticado' });
            }

            console.log('USER EN REQUEST:', req.user);

            
            const carrito = await carritoService.getCarritoByUserId(idUsuario);
            res.status(200).json(carrito);
        } catch (error:any) {
            res.status(400).json({message: error.message});
        }
    }

    async agregarProductoAlCarrito(req:Request, res:Response){
        try {
            const { cantidad } = req.body;
            const idProducto = Number(req.params.id);
            const idUsuario = req.user?.id;

            if (!idUsuario) {
                return res.status(401).json({ error: 'No autenticado' });
            }

            const resultado = await carritoService.agregarProductoAlCarrito(idUsuario, idProducto, cantidad);
            res.status(200).json(resultado);
        } catch (error:any) {
            res.status(400).json({message: error.message});
        }
    }

    async eliminarProductoAlCarrito(req:Request, res:Response){
        try {
            const idProducto = Number(req.params.id);
            const idUsuario = req.user?.id;

            if (!idUsuario) {
                return res.status(401).json({ error: 'No autenticado' });
            }

            const resultado = await carritoService.eliminarProductoDelCarrito(idUsuario, idProducto);
            res.status(200).json(resultado);
        } catch (error:any) {
            res.status(400).json({message: error.message});
        }
    }
}