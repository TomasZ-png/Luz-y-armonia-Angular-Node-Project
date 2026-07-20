import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export class VarianteRepository{

    async createVariante(data: Prisma.VarianteProductoCreateInput){
        return await prisma.varianteProducto.create({data});
    }

    async updateVariante(id: number, data: Prisma.VarianteProductoUpdateInput){
        return await prisma.varianteProducto.update({
            data,
            where: {id}
        })
    }

    async actualizarStock(id: number, stock: number){
        return await prisma.varianteProducto.update({
            where: {id: id},
            data: {stock: stock}
        })
    }

    async getVarianteById(id:number){
        return await prisma.varianteProducto.findUnique({
            where: {id: id},

            include: {
                Aroma: true,
                Producto: true
            }
        })
    }

    async getByAroma(aroma: string){
        return await prisma.varianteProducto.findMany({
            where: {
                Aroma: {
                    aroma: {
                        contains: aroma,
                        mode: 'insensitive'
                    }
                }
            },

            include: {
                Producto: true,
                Aroma: true,
            }
        })
    }

    async updateEstado(id:number, estado:string){
        return await prisma.varianteProducto.update({
            where: {id: id},
            data: {estado: estado}
        })
    }

    async getByProducto(idProducto: number){
        return await prisma.varianteProducto.findMany({
            where:{
                idProducto: idProducto
            },

            include:{
                Aroma: true
            }
        })
    }

    async actualizarPrecio(idVariante: number, precio: number){
        return await prisma.varianteProducto.update({
            where:{id:idVariante},
            data:{precio}
        })
    }

    async generarSKU(){
        
    }

    async getBySKU(sku: string){
        return await prisma.varianteProducto.findUnique({
            where:{sku: sku}
        })
    }

    async delete(id:number){
        return await prisma.varianteProducto.delete({
            where:{id:id}
        })
    }
}
