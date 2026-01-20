import { prisma } from "../prisma";
export class TipoProductoRepository {
    async getAll() {
        return await prisma.tipo_de_productos.findMany();
    }
    async getById(id) {
        return await prisma.tipo_de_productos.findUnique({
            where: { id }
        });
    }
    async create(data) {
        return await prisma.tipo_de_productos.create({ data });
    }
    async delete(id) {
        return await prisma.tipo_de_productos.delete({
            where: { id }
        });
    }
    async buscarPorNombre(tipo) {
        return await prisma.tipo_de_productos.findFirst({
            where: { tipo }
        });
    }
}
//# sourceMappingURL=tipoProductos.repository.js.map