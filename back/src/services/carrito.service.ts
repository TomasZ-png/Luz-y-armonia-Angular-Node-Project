import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { ProductoRepository } from '../repository/producto.repository';

export class CarritoService {
    constructor(private carritoRepository: MiCarritoRepository, private productoRepository:ProductoRepository ){}

    async getCarritoByUserId(idUsuario:number){
        let carrito = await this.carritoRepository.getCarritoByUserId(idUsuario);

        if(!carrito){
            await this.carritoRepository.createCarrito(idUsuario);
            carrito = await this.carritoRepository.getCarritoByUserId(idUsuario);
        }

        return carrito;
    }

    async agregarProductoAlCarrito(userId: number, productoId:number, cantidad:number){
        let carrito = await this.carritoRepository.getCarritoByUserId(userId);

        if(!carrito){
            await this.carritoRepository.createCarrito(userId);
            carrito = await this.carritoRepository.getCarritoByUserId(userId);
        }

        const producto = await this.productoRepository.getProductById(productoId);

        if(!producto) {
            throw new Error('El producto no existe');
        }

        if(producto.stock < cantidad){
            throw new Error('La cantidad supera al stock');
        }

        return await this.carritoRepository.agregarProductoAlCarrito(carrito!.id, productoId, cantidad);
    }

    async eliminarProductoDelCarrito(userId:number, productoId:number){
        let carrito = await this.carritoRepository.getCarritoByUserId(userId);

        if(!carrito){
            await this.carritoRepository.createCarrito(userId);
            carrito = await this.carritoRepository.getCarritoByUserId(userId);
        }

        return await this.carritoRepository.eliminarProductoDelCarrito(carrito!.id, productoId);
    }
}