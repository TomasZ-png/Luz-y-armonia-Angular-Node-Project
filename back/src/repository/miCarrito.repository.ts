import { prisma } from "../prisma";
export class MiCarritoRepository{

    async createCarrito(idUsuario:number){
        return await prisma.mi_Carrito.create({
            data:{idUsuario}
        })
    }

    async getCarritoByUserId(idUsuario:number){
        return await prisma.mi_Carrito.findUnique({
            where: {idUsuario},
            include: {
                Mi_Carrito_Producto:{
                    include: {
                        VarianteProducto: {
                            include: {
                                Aroma: true,
                                Producto: {
                                    include: {
                                        ImagenProducto: true
                                    }
                                }
                            }
                        },
                        
                    }
                }
            }
        });
    }

    async agregarProductoAlCarrito(idCarrito:number, idVariante:number, cantidad:number){
        return await prisma.mi_Carrito_Producto.upsert({
            where: {
                idCarrito_idVariante: {
                    idCarrito,
                    idVariante
                }
            },
            update: {
                cantidad: {
                    increment: cantidad
                }
            },
            create:{
                idCarrito,
                idVariante,
                cantidad
            }
        })
    }

    async eliminarProductoDelCarrito(idCarrito:number, idVariante:number){
        return await prisma.mi_Carrito_Producto.delete({
            where: {
                idCarrito_idVariante: {
                    idCarrito,
                    idVariante
                }
            }
        })
    }

    async vaciarCarrito(idCarrito: number){
        return await prisma.mi_Carrito_Producto.deleteMany({
            where:{idCarrito}
            })   
    }
}