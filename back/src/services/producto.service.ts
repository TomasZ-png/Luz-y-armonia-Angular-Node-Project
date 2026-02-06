import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { ProductoRepository } from "../repository/producto.repository";
import fs from 'fs';
import path from 'path';

export class ProductoService {

    constructor(private productoRepository: ProductoRepository){}

    async createProduct(data: any){
        return await this.productoRepository.createNewProduct(data);
    }

    async updateProduct(id:number, data:any){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        const {
            id: _idDescartado,
            idAroma,
            idTipoProducto,
            ...rest
        } = data;
        
        const dataSinId: Prisma.ProductoUpdateInput = {
            ...rest,
            aroma: {
                connect: { id: Number(idAroma)}
            },
            Tipo_de_productos: {
                connect: { id: Number(idTipoProducto)}
            }
        };

        return await this.productoRepository.updateProduct(id, dataSinId);
    }

    async deleteProduct(id:number){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        product.ImagenProducto.forEach(img => {
            const imagePath = path.join(process.cwd(), 'uploads', img.url);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        });

        await prisma.imagenProducto.deleteMany({
            where: { id: product.id }
        });

        return await this.productoRepository.deleteProduct(id);
    }

    async getProductoById(id:number){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        return product;
    }

    async getProductByNameOrAromaOrProduct(valor:string){
        
        if(!valor) {
            throw new Error('El valor de la busqueda no puede estar vacio')
        }

        const valorLimpio = valor.toLowerCase().trim();

        let palabras = valorLimpio.split(" ");

        const palabrasBasura = ["de","la","el","y","con","para"];

        palabras = palabras.filter(p => !palabrasBasura.includes(p) && p.length > 1);
        
        if(palabras.length === 0){
            throw new Error('Busqueda vacia');
        }

        const products = await this.productoRepository.buscarProductosConPalabras(palabras);

        if(!products){
            throw new Error('No se han encontrado productos con el valor ingresado.');
        }

        return products;
    }

    async getAllProducts(){
        const products = await this.productoRepository.getAll();

        if(!products){
            throw new Error('No se encontraron ningun producto.');
        }

        for(const product of products){
            if(product.stock === 0){
                await this.productoRepository.updateProductState(product.id, 'AGOTADO');
            } else {
                await this.productoRepository.updateProductState(product.id, 'DISPONIBLE');
            }
        }

        return products;
    }

}