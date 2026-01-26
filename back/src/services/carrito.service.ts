import { MiCarritoRepository } from "../repository/miCarrito.repository";

export class CarritoService {
    constructor(private carritoRepository: MiCarritoRepository){}

    async getCarritoByUserId(idUsuario:number){
        let carrito = await this.carritoRepository.getCarritoByUserId(idUsuario);

        if(!carrito){
            await this.carritoRepository.createCarrito(idUsuario);
            carrito = await this.carritoRepository.getCarritoByUserId(idUsuario);
            // throw new Error('El carrito con el id solicitado no existe.');
        }

        return carrito;
    }

    async agregarProductoAlCarrito(userId: number, productoId:number, cantidad:number){
        const carrito = await this.carritoRepository.getCarritoByUserId(userId);

        if(!carrito){
            throw new Error('El carrito con el id solicitado no existe.');
        }

        return await this.carritoRepository.agregarProductoAlCarrito(carrito.id, productoId, cantidad);
    }

    async eliminarProductoDelCarrito(userId:number, productoId:number){
        const carrito = await this.carritoRepository.getCarritoByUserId(userId);

        if(!carrito){
            throw new Error('El carrito con el id solicitado no existe.');
        }

        return await this.carritoRepository.eliminarProductoDelCarrito(carrito.id, productoId);
    }
}