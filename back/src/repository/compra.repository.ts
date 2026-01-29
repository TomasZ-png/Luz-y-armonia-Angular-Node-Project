import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import productoRouter from "../routes/productoRouter/producto.routes";




export class CompraRepository {

    async createCompra(idUsuario:number) {
        return await prisma.compra.create({
            data:{idUsuario}
        })
    }

    async getAllByUser(idUsuario:number){
        const compras = await prisma.compra.findMany({
            where: {idUsuario},
            include: {
                Producto_Compra: {
                    include: {
                        Producto: {
                            include: {
                                ImagenProducto: true,
                                aroma: true,
                                Tipo_de_productos: true
                            }
                        }
                    }
                }
            }
        })

        return compras.map(compra => ({
            id: compra.id,
            fecha: compra.fecha,
            total: compra.total,
            productos: compra.Producto_Compra.map(pc => ({
                id: pc.id,
                cantidad: pc.cantidad,
                producto: pc.Producto
            }))
        }))
    }

    async crearProductoCompra(idProducto:number, cantidad:number, idCompra:number){
        return await prisma.producto_Compra.create({
            data:{idProducto, cantidad, idCompra}
        })
    }

    async actualizarTotal(idCompra:number, total:number){
        return await prisma.compra.update({
            where: {
                id: idCompra
            },
            data: {
                total
            }
        })
    }
}