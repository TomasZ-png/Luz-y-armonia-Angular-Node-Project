import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';
    
export class UsuarioRepository {

    async createUser(data: Prisma.UsuarioCreateInput){
        return await prisma.usuario.create({
            data: { 
                ...data,
                Mi_Carrito: {
                    create: {}
            }}
        });
    }

    async getUserById(id: number){
        return await prisma.usuario.findUnique(
            {
                where:{id}
            })
    }

    async getUserByEmail(correo:string){
        return await prisma.usuario.findUnique({
            where: {correo}
        })
    }
}