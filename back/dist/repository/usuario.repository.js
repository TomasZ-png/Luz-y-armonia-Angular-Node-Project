import { prisma } from '../prisma';
export class UsuarioRepository {
    async createUser(data) {
        return await prisma.usuario.create({
            data: {
                ...data,
                Mi_Carrito: {
                    create: {}
                }
            }
        });
    }
    async getUserById(id) {
        return await prisma.usuario.findUnique({
            where: { id }
        });
    }
    async getUserByEmail(correo) {
        return await prisma.usuario.findUnique({
            where: { correo }
        });
    }
}
//# sourceMappingURL=usuario.repository.js.map