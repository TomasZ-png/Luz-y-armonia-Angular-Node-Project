import { prisma } from "../prisma";
export class FavoritoRepository {
    async misFavoritos(idUsuario) {
        return await prisma.favorito.findMany({
            where: {
                idUsuario
            },
            include: {
                Producto: {
                    include: {
                        ImagenProducto: true
                    }
                }
            }
        });
    }
    async agregarAFavoritos(data) {
        return await prisma.favorito.create({
            data
        });
    }
    async eliminarDeFavoritos(idUsuario, idProducto) {
        return await prisma.favorito.delete({
            where: {
                idUsuario_idProducto: {
                    idUsuario,
                    idProducto
                }
            }
        });
    }
    async buscarProducto(idUsuario, idProducto) {
        return await prisma.favorito.findUnique({
            where: {
                idUsuario_idProducto: {
                    idUsuario,
                    idProducto
                }
            }
        });
    }
}
//# sourceMappingURL=favorito.repository.js.map