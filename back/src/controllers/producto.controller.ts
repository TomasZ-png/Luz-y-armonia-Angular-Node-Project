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

    async getAllProducts(req: Request, res:Response){
        try {
            const products = await productoService.getAllProducts();
            res.status(200).json({message: `Productos encontrados: ${products.length}`, productos: products}); 
        } catch (error) {
            res.status(400).json({error:error});
        }
    }

    async getProductByName(req:Request, res:Response){
        try {
            const { nombre } = req.query; 

            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({ message: "El parámetro nombre no puede estar vacio" });
            }

            const products = await productoService.getProductoByName(nombre)
            res.status(200).json({ message: `Coincidencias con ${nombre} de ${products.length} productos`, productos: products})
        } catch (error) {
            res.status(400).json({error:error});
        }
    }

    async getProductById(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            if(isNaN(id)){
                return res.status(400).json({ message: 'El id del producto debe ser numerico.'});
            }

            const product = await productoService.getProductoById(id);

            if(!product){
                return res.status(404).json({message: `Producto con id ${id} no encontrado`});
            }

            res.status(200).json({ message: `Producto de id ${id} encontrado.`, producto: product}); 
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async deleteProduct(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            if(isNaN(id)){
                return res.status(400).json({ message: 'El id debe ser numerico.'});
            }

            const producto = await productoService.getProductoById(id);

            if(!producto){
                return res.status(404).json({ message: 'Producto no encontrado.'})
            }
            
            await productoService.deleteProduct(id);
            res.status(200).json({message: 'Producto eliminado correctamente.'});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    async updateProduct(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            if(isNaN(id)){
                return res.status(400).json({message: 'El id debe ser numerico.'});
            }

            const product = productoService.getProductoById(id);

            if(!product){
                return res.status(404).json({message: 'Producto no encontrado'})
            }

            const productoModificado = await productoService.updateProduct(id, req.body);
            res.status(200).json({message: 'Producto actualizado correctamente.', producto: productoModificado});
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }
}