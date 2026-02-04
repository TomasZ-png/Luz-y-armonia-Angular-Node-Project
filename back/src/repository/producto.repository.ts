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

    async actualizarStock(id:number, nuevoStock:number){
        return await prisma.producto.update({
            where: {id},
            data: {stock: nuevoStock}
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

    async getProductByNameOrAromaOrProduct(valor:string){
        return await prisma.producto.findMany({
            where: {
                OR: [
                    {
                        nombre: {
                            contains: valor,
                            mode: 'insensitive'
                        }
                    },
                    {
                        aroma: {
                            aroma: {
                                contains: valor,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        Tipo_de_productos: {
                            tipo: {
                                contains: valor,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
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

    async updateProductState(idProducto: number, estado:string){
        return await prisma.producto.update({
            where: {id: idProducto},
            data: {estadoProducto: estado}
        })
    }
}