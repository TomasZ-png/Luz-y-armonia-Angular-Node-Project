import { type Request, type Response } from "express"
import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { CarritoService } from "../services/carrito.service";
import { ProductoRepository } from "../repository/producto.repository";
import { VarianteRepository } from "../repository/variante.repository";

const carritoRepository = new MiCarritoRepository();
const productoRepository = new ProductoRepository();
const varianteRepository = new VarianteRepository();
const carritoService = new CarritoService(carritoRepository, productoRepository, varianteRepository);

export class CarritoController{

    async getCarritoByUserId(req:Request, res:Response){
        try {
            const idUsuario = req.user?.id;
            
            if (!idUsuario) {
                return res.status(401).json({ error: 'No autenticado' });
            }
            
            const carrito = await carritoService.getCarritoByUserId(idUsuario);
            res.status(200).json(carrito);
        } catch (error:any) {
            res.status(400).json({message: error.message});
        }
    }

    async agregarProductoAlCarrito(req:Request, res:Response){
        try {
            const { cantidad } = req.body;
            const idVariante = Number(req.params.id);
            const idUsuario = req.user?.id;

            if (!idUsuario) {
                return res.status(401).json({ error: 'No autenticado' });
            }

            const resultado = await carritoService.agregarProductoAlCarrito(idUsuario, idVariante, cantidad);
            res.status(200).json(resultado);
        } catch (error:any) {
            res.status(400).json({message: error.message});
        }
    }

    async eliminarProductoAlCarrito(req:Request, res:Response){
        try {
            const idVariante = Number(req.params.id);
            const idUsuario = req.user?.id;

            if (!idUsuario) {
                return res.status(401).json({ error: 'No autenticado' });
            }

            const resultado = await carritoService.eliminarProductoDelCarrito(idUsuario, idVariante);
            res.status(200).json(resultado);
        } catch (error:any) {
            res.status(400).json({message: error.message});
        }
    }
}