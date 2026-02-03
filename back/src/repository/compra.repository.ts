import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import productoRouter from "../routes/productoRouter/producto.routes";

export class CompraRepository {

    async createCompra(idUsuario:number) {
        return await prisma.compra.create({
            data:{idUsuario}
        })
    }

    async getCompraById(compraId: number){
        const compra = await prisma.compra.findUnique({
            where:{id: compraId},
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

        if(!compra) return null;

        return {
            id: compra.id,
            fecha: compra.fecha,
            total: compra.total,
            estado: compra.estado,
            paymentId: compra.paymentId,
            productos: compra.Producto_Compra.map(pc => ({
                id: pc.id,
                cantidad: pc.cantidad,
                producto: pc.Producto
            }))
        }
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
            estado: compra.estado,
            paymentId: compra.paymentId,
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

    async actualizarEstadoCompra(idCompra: number, estado: string){
        return await prisma.compra.update({
            where: {
                id: idCompra
            },
            data: {
                estado
            }
        })
    }

    async getItemsOfCompraByCompraId(compraId: number){
        return await prisma.producto_Compra.findMany({
            where: {
                idCompra: compraId
            },
            include: {
                Producto: true
            }
        })
    }
}