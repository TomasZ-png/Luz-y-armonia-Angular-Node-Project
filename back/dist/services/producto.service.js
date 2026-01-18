import { prisma } from "../prisma";
import fs from 'fs';
import path from 'path';
export class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async createProduct(data) {
        return await this.productoRepository.createNewProduct(data);
    }
    async updateProduct(id, data) {
        const product = await this.productoRepository.getProductById(id);
        if (!product) {
            throw new Error('El producto con el id solicitado no existe.');
        }
        const { id: _idDescartado, idAroma, idTipoProducto, ...rest } = data;
        const dataSinId = {
            ...rest,
            aroma: {
                connect: { id: Number(idAroma) }
            },
            Tipo_de_productos: {
                connect: { id: Number(idTipoProducto) }
            }
        };
        return await this.productoRepository.updateProduct(id, dataSinId);
    }
    async deleteProduct(id) {
        const product = await this.productoRepository.getProductById(id);
        if (!product) {
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
    async getProductoById(id) {
        const product = await this.productoRepository.getProductById(id);
        if (!product) {
            throw new Error('El producto con el id solicitado no existe.');
        }
        return product;
    }
    async getProductoByName(nombre) {
        const product = await this.productoRepository.getProductByName(nombre);
        if (!product) {
            throw new Error('No se han encontrado productos con el nombre ingresado.');
        }
        return product;
    }
    async getAllProducts() {
        const products = await this.productoRepository.getAll();
        if (!products) {
            throw new Error('No se encontraron ningun producto.');
        }
        return products;
    }
}
//# sourceMappingURL=producto.service.js.map