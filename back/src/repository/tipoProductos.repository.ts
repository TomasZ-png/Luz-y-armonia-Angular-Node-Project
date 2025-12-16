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
}