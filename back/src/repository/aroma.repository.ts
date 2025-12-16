import { prisma } from "../prisma";

export class AromaRepository{

    async getAll(){
        return await prisma.aroma.findMany();
    }

}