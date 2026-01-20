import { prisma } from "../prisma";
export class ProductoRepository {
    async createNewProduct(data) {
        return await prisma.producto.create({ data });
    }
    async updateProduct(id, data) {
        return await prisma.producto.update({
            data,
            where: { id }
        });
    }
    async deleteProduct(id) {
        return await prisma.producto.delete({
            where: { id }
        });
    }
    async getProductById(id) {
        return await prisma.producto.findUnique({
            where: { id },
            include: {
                aroma: true,
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        });
    }
    async getProductByName(nombre) {
        return await prisma.producto.findMany({
            where: {
                nombre: {
                    contains: nombre,
                    mode: 'insensitive'
                }
            },
            include: {
                aroma: true,
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        });
    }
    async getAll() {
        return await prisma.producto.findMany({
            include: {
                aroma: true,
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        });
    }
}
//# sourceMappingURL=producto.repository.js.map