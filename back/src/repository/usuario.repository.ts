import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';
    
export class UsuarioRepository {

    async createUser(data: Prisma.UsuarioCreateInput){
        return await prisma.usuario.create({ data });
    }

    async getUserById(id: number){
        return await prisma.usuario.findUnique(
            {
                where:{id}
            })
    }

}