export class CarritoService {
    constructor(carritoRepository) {
        this.carritoRepository = carritoRepository;
    }
    async getCarritoByUserId(id) {
        const carrito = await this.carritoRepository.getCarritoByUserId(id);
        if (!carrito) {
            throw new Error('El carrito con el id solicitado no existe.');
        }
        return carrito;
    }
    async agregarProductoAlCarrito(userId, productoId, cantidad) {
        const carrito = await this.carritoRepository.getCarritoByUserId(userId);
        if (!carrito) {
            throw new Error('El carrito con el id solicitado no existe.');
        }
        return await this.carritoRepository.agregarProductoAlCarrito(carrito.id, productoId, cantidad);
    }
    async eliminarProductoDelCarrito(userId, productoId) {
        const carrito = await this.carritoRepository.getCarritoByUserId(userId);
        if (!carrito) {
            throw new Error('El carrito con el id solicitado no existe.');
        }
        return await this.carritoRepository.eliminarProductoDelCarrito(carrito.id, productoId);
    }
}
//# sourceMappingURL=carrito.service.js.map