import { favorito } from './../../node_modules/.prisma/client/index.d';
import { prisma } from "../prisma";

export class FavoritoRepository {
    
    async misFavoritos(idUsuario: number){
        const favoritos = await prisma.favorito.findMany({
            where: {
                idUsuario
            },
            include: {
                Producto: {
                    include: {
                        ImagenProducto: true,
                        aroma: true,
                        Tipo_de_productos: true
                    }
                }
            }
        });

        // Retornar solo los productos, no los objetos de favorito
        return favoritos.map(favorito => favorito.Producto);
    }

    async agregarAFavoritos(data: {idUsuario: number, idProducto: number}){
        return await prisma.favorito.create({
            data
        });
    }

    async eliminarDeFavoritos(idUsuario: number, idProducto: number){
        return await prisma.favorito.delete({
            where: {
                idUsuario_idProducto: {
                    idUsuario,
                    idProducto
                }
            }
        })
    }

    async buscarProducto(idUsuario: number, idProducto: number){
        return await prisma.favorito.findUnique({
            where: {
                idUsuario_idProducto: {
                    idUsuario,
                    idProducto
                }
            }
        })
    }

}