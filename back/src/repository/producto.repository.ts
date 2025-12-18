import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export class ProductoRepository{

    async createNewProduct(data: Prisma.ProductoCreateInput){
        return await prisma.producto.create({data})
    }

    async updateProduct(id:number, data:Prisma.ProductoUpdateInput){
        return await prisma.producto.update({
            data, 
            where:{id}
        })
    }

    async deleteProduct(id:number){
        return await prisma.producto.delete({
            where: {id}
        })
    }

    async getProductById(id:number){
        return await prisma.producto.findUnique({
            where: {id},

            include: {
                aroma: true,
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        })
    }

    async getProductByName(nombre:string){
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
        })
    }

    async getAll(){
        return await prisma.producto.findMany({
            include: {
                aroma: true,
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        });
    }
}