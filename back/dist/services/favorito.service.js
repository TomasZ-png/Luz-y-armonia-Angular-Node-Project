export class FavoritoService {
    constructor(favoritoRepository) {
        this.favoritoRepository = favoritoRepository;
    }
    async misFavoritos(idUsuario) {
        return await this.favoritoRepository.misFavoritos(idUsuario);
    }
    async agregarAFavoritos(data) {
        const existe = this.favoritoRepository.buscarProducto(data.idUsuario, data.idProducto);
        if (!existe) {
            return await this.favoritoRepository.agregarAFavoritos(data);
        }
        else {
            return await this.favoritoRepository.eliminarDeFavoritos(data.idUsuario, data.idProducto);
        }
    }
    async eliminarDeFavoritos(data) {
        return await this.favoritoRepository.eliminarDeFavoritos(data.idUsuario, data.idProducto);
    }
}
//# sourceMappingURL=favorito.service.js.map