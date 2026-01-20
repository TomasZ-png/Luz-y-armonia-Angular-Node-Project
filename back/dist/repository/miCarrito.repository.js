import { prisma } from "../prisma";
export class MiCarritoRepository {
    async createCarrito(idUsuario) {
        return await prisma.mi_Carrito.create({
            data: { idUsuario }
        });
    }
    async getCarritoByUserId(idUsuario) {
        return await prisma.mi_Carrito.findUnique({
            where: { idUsuario },
            include: {
                Mi_Carrito_Producto: {
                    include: {
                        Producto: {
                            include: {
                                ImagenProducto: true
                            }
                        },
                    }
                }
            }
        });
    }
    async agregarProductoAlCarrito(idCarrito, idProducto, cantidad) {
        return await prisma.mi_Carrito_Producto.upsert({
            where: {
                idCarrito_idProducto: {
                    idCarrito,
                    idProducto
                }
            },
            update: {
                cantidad: {
                    increment: cantidad
                }
            },
            create: {
                idCarrito,
                idProducto,
                cantidad
            }
        });
    }
    async eliminarProductoDelCarrito(idCarrito, idProducto) {
        return await prisma.mi_Carrito_Producto.delete({
            where: {
                idCarrito_idProducto: {
                    idCarrito,
                    idProducto
                }
            }
        });
    }
}
//# sourceMappingURL=miCarrito.repository.js.map