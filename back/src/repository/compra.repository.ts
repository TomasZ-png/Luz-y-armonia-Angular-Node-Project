import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";


export class CompraRepository {

    async createCompra(idUsuario:number) {
        return await prisma.compra.create({
            data:{idUsuario}
        })
    }

    async getAllByUser(idUsuario:number){
        return await prisma.compra.findMany({
            where: {idUsuario}
        })
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