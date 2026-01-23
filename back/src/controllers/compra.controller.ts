import { type Request, type Response } from "express"

import { CompraRepository } from "../repository/compra.repository";
import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { ProductoRepository } from "../repository/producto.repository";
import { CompraService } from "../services/compra.service";

const compraRepository = new CompraRepository();
const productoRepository = new ProductoRepository();
const carritoRepository = new MiCarritoRepository();

const compraService = new CompraService(compraRepository, productoRepository, carritoRepository);

export class CompraController {

    async comprarPorUnidad(req:Request, res:Response){
        try {
            const idUsuario = req.user?.id;
            const idProducto = Number(req.params.id);
            const { cantidad } = req.body;

            if(!idUsuario){
                return res.status(401).json({ error: 'No autenticado' });
            }

            if(!idProducto){
                return res.status(401).json({ error: 'El producto no existe' });
            }

            if(!cantidad || cantidad === 0){
                return res.status(401).json({ error: 'Datos invalidos, cantidad no valida' });
            }

            const compra = await compraService.comprarUnidad(idUsuario, idProducto, cantidad);
            res.status(200).json(compra);
        } catch (error:any) {
            res.status(400).json({message: error.message});            
        }
    }

    async comprarCarrito(req:Request, res:Response){
        try {
            const idUsuario = req.user?.id;

            if(!idUsuario){
                return res.status(401).json({ error: 'No autenticado' });
            }

            const compra = await compraService.comprarCarrito(idUsuario);
            res.status(200).json(compra);
        } catch (error:any) {
            res.status(400).json({message: error.message});            
        }
    }

    async getAllByUser(req:Request, res:Response){
        try {
            const idUsuario = req.user?.id;

            if(!idUsuario){
                return res.status(401).json({ error: 'No autenticado' });
            }

            const compras = await compraService.getCompras(idUsuario);
            res.status(200).json(compras);
        } catch (error:any) {
            res.status(400).json({message: error.message});            
        }
    }



}