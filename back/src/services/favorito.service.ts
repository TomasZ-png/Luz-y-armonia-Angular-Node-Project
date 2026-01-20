import { FavoritoRepository } from "../repository/favorito.repository";

export class FavoritoService {

    constructor(private favoritoRepository: FavoritoRepository){}

    async misFavoritos(idUsuario: number){
        return await this.favoritoRepository.misFavoritos(idUsuario);
    }

    async agregarAFavoritos(data:{idUsuario:number, idProducto: number}){
        const existe = await this.favoritoRepository.buscarProducto(data.idUsuario, data.idProducto);

        console.log('producto : ', existe);

        if(!existe || existe === null || existe === undefined){
            return await this.favoritoRepository.agregarAFavoritos(data);
        } else {
            return await this.favoritoRepository.eliminarDeFavoritos(data.idUsuario, data.idProducto);
        }
    }

    async eliminarDeFavoritos(data:{idUsuario:number, idProducto: number}){
        return await this.favoritoRepository.eliminarDeFavoritos(
            data.idUsuario,
            data.idProducto
        );
    }

    async productoEnFav(idUsuario:number, idProducto:number){
        const productoEnFav = await this.favoritoRepository.buscarProducto(idUsuario, idProducto);

        return productoEnFav !== null; 
    }
}