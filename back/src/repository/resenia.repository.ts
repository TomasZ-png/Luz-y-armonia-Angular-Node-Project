import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export class ReseniaRepository{

    async generateProductResenia(data: Prisma.ReseniaCreateInput){
        return await prisma.resenia.create({data})
    }
    
    async getReseniaByProduct(idProducto: number){
        return await prisma.resenia.findMany({
            where: {idProducto},
            include: {
                Usuario: true,
            }
        })
    }

}