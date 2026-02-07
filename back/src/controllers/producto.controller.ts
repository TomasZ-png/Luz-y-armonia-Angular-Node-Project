import { type Request, type Response } from "express"
import { ProductoRepository } from "../repository/producto.repository";
import { ProductoService } from "../services/producto.service";
import { prisma } from "../prisma";
import { promises as fs } from 'fs';
import path from 'path';


const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController{

    async createProduct(req: Request, res: Response){
        try {
            const files = req.files as Express.Multer.File[] | undefined;

            const imagenes = files?.map(file => ({
                url: `/uploads/productos/${file.filename}`
            }));

            const {
                nombre, descripcion, precio, stock,
                alto, ancho, mililitros,
                premium, idAroma, idTipoProducto, material, duracion, miniDescripcion
            } = req.body;

            const productData = {
                nombre, descripcion,
                precio: Number(precio),
                stock: Number(stock),
                alto: alto ? Number(alto) : null,
                ancho: ancho ? Number(ancho) : null,
                mililitros: mililitros ? Number(mililitros) : null,
                premium: premium === 'true',
                material, duracion, miniDescripcion,
                idAroma: Number(idAroma),
                idTipoProducto: Number(idTipoProducto),
                ImagenProducto: {
                    create: imagenes
                }
            }

            const product = await productoService.createProduct(productData);
            res.status(201).json({ message: 'Producto creado correctamente', producto: product});
        } catch (error:any) {
            console.error('PRISMA ERROR 👉', error.message);
            console.error('PRISMA META 👉', error.meta);
            res.status(400).json({
                message: error.message,
                meta: error.meta
            });
        }
    }

    async updateProduct(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            console.log('BODY 👉', req.body);
            console.log('FILES 👉', req.files);

            if(isNaN(id)){
                return res.status(400).json({message: 'El id debe ser numerico.'});
            }

            const product = await productoService.getProductoById(id);

            if(!product){
                return res.status(404).json({message: 'Producto no encontrado'})
            }

            const files = req.files as Express.Multer.File[] | undefined;

            const imagenes = files?.map(file => ({
                url: `/uploads/productos/${file.filename}`
            }));

            const {
            nombre, descripcion, precio, stock,
            alto, ancho, mililitros,
            premium, idAroma, idTipoProducto, material, duracion, miniDescripcion
            } = req.body;

            const productData = {
            nombre,
            descripcion,
            material,
            duracion,
            miniDescripcion,
            precio: Number(precio),
            stock: Number(stock),
            alto: alto ? Number(alto) : null,
            ancho: ancho ? Number(ancho) : null,
            mililitros: mililitros ? Number(mililitros) : null,
            premium: premium === 'true',
            idAroma: Number(idAroma),
            idTipoProducto: Number(idTipoProducto),
            ImagenProducto: {
                    create: imagenes
                }
            // ...(imagenes && {
            //     ImagenProducto: {
            //     create: imagenes
            //     }
            // })
            };

            const imagenesEliminadas = req.body.imagenesEliminadas || req.body['imagenesEliminadas[]'] || req.body['imagenesEliminadas'];

            if(imagenesEliminadas){
                const ids = Array.isArray(imagenesEliminadas)
                    ? imagenesEliminadas.map((v: any) => Number(v))
                    : [Number(imagenesEliminadas)];

                // obtener registros para borrar archivos fisicos
                const imagenesRecords = await prisma.imagenProducto.findMany({
                    where: { id: { in: ids } }
                });

                for(const imgRec of imagenesRecords){
                    try{
                        const fileName = path.basename(imgRec.url);
                        const filePath = path.join(process.cwd(), 'uploads', 'productos', fileName);
                        await fs.unlink(filePath).catch(() => {});
                    } catch(err){
                        console.error('Error al borrar archivo:', err);
                    }
                }

                await prisma.imagenProducto.deleteMany({
                    where: {
                        id: { in: ids }
                    }
                })
            }

            const productoModificado = await productoService.updateProduct(id, productData);
            res.status(200).json(productoModificado);
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async getAllProducts(req: Request, res:Response){
        try {
            const products = await productoService.getAllProducts();
            res.status(200).json(products); 
        } catch (error) {
            res.status(400).json({error:error});
        }
    }

    async getProductByNameOrAromaOrProduct(req:Request, res:Response){
        try {
            const { valor } = req.query; 

            if (!valor || typeof valor !== 'string' || valor.trim() === '') {
                return res.status(400).json({ message: "El parámetro valor no puede estar vacio" });
            }

            const products = await productoService.getProductByNameOrAromaOrProduct(valor)
            res.status(200).json(products)
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

            res.status(200).json(product); 
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

    
}