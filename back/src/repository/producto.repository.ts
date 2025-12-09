import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export class ProductoRepository{

    // async createNewProduct(data: any){
    //     return await prisma.producto.create({
    //         data: {
    //             nombre: data.nombre,
    //             precio: data.precio,
    //             stock: data.stock,
    //             idTamanio: data.idTamanio,
    //             mililitros: data.mililitros,
    //             premium: data.premium,
    //             aroma: {
    //                 connect: {id: data.idAroma}
    //             }
    //         }
    //     })
    // }

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
            where: {id}
        })
    }

    async getProductByName(nombre:string){
        return await prisma.producto.findMany({
            where: {
                nombre: {
                    contains: nombre,
                    mode: 'insensitive'
                }
            }
        })
    }
}