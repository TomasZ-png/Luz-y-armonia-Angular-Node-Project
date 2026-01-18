import { prisma } from "../prisma";

export class TipoProductoRepository{

    async getAll(){
        return await prisma.tipo_de_productos.findMany();
    }

    async getById(id:number){
        return await prisma.tipo_de_productos.findUnique({
            where: {id}
        })
    }

    async create(data:any){
        return await prisma.tipo_de_productos.create({data});
    }

    async delete(id:number){
        return await prisma.tipo_de_productos.delete({
            where: {id}
        })
    }

    async buscarPorNombre(tipo:string){
        return await prisma.tipo_de_productos.findFirst({
            where: {tipo}
        })
    }
}