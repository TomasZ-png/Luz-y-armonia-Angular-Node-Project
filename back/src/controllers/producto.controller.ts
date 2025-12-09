import { type Request, type Response } from "express"
import { ProductoRepository } from "../repository/producto.repository";
import { ProductoService } from "../services/producto.service";


const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController{

    async createProduct(req: Request, res: Response){
        try {
            const product = await productoService.createProduct(req.body);
            res.status(201).json({ message: 'Producto creado correctamente', producto: product});
        } catch (error) {
            res.status(400).json({error: error})
        }
    }

}