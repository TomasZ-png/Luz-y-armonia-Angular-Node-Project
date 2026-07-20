import { type Request, type Response } from "express"

import { CompraRepository } from "../repository/compra.repository";
import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { ProductoRepository } from "../repository/producto.repository";
import { CompraService } from "../services/compra.service";
import { VarianteRepository } from "../repository/variante.repository";

const compraRepository = new CompraRepository();
const productoRepository = new ProductoRepository();
const carritoRepository = new MiCarritoRepository();
const varianteRepository = new VarianteRepository();

const compraService = new CompraService(compraRepository, productoRepository, carritoRepository, varianteRepository);

export class CompraController {

    async getCompraById(req: Request, res: Response){
        try {
            const idCompra = Number(req.params.id);

            if(!idCompra){
                return res.status(404).json({error: 'El id no es valido o no existe.'});
            }

            const compra = await compraService.getCompraById(idCompra);

            if(!compra){
                return;
            }

            const idUsuario = req.user?.id;

            if(idUsuario !== compra.idUsuario){
                return res.status(403).json({ error: "Acceso Denegado" });
            }

            res.status(200).json(compra);
        } catch (error) {
            
        }
    }


    async comprarPorUnidad(req:Request, res:Response){
        try {
            const idUsuario = req.user?.id;
            const idVariante = Number(req.params.id);
            const { cantidad } = req.body;

            if(!idUsuario){
                return res.status(401).json({ error: 'No autenticado' });
            }

            if(!idVariante){
                return res.status(401).json({ error: 'El producto no existe' });
            }

            if(!cantidad || cantidad === 0){
                return res.status(401).json({ error: 'Datos invalidos, cantidad no valida' });
            }
            
            const compra = await compraService.comprarUnidad(idUsuario, idVariante, cantidad);
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