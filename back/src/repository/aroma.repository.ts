import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export class AromaRepository{

    async getAll(){
        return await prisma.aroma.findMany();
    }

    async getById(id:number){
        return await prisma.aroma.findUnique({
            where: {id}
        })
    }

    async getByName(aroma:string){
        return await prisma.aroma.findUnique({
            where: {aroma}
        })
    }

    async create(aroma:string){
        return await prisma.aroma.create({
            data: {aroma}
        })
    }

    async delete(id:number){
        return await prisma.aroma.delete({
            where: {id}
        })
    }

}