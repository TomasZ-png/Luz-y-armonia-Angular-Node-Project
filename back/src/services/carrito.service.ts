import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { ProductoRepository } from '../repository/producto.repository';
import { VarianteRepository } from '../repository/variante.repository';

export class CarritoService {
    constructor(private carritoRepository: MiCarritoRepository, 
                private productoRepository:ProductoRepository,
                private varianteRepository: VarianteRepository,
            ){}

    async getCarritoByUserId(idUsuario:number){
        let carrito = await this.carritoRepository.getCarritoByUserId(idUsuario);

        if(!carrito){
            await this.carritoRepository.createCarrito(idUsuario);
            carrito = await this.carritoRepository.getCarritoByUserId(idUsuario);
        }

        return carrito;
    }

    async agregarProductoAlCarrito(userId: number, varianteId:number, cantidad:number){
        let carrito = await this.carritoRepository.getCarritoByUserId(userId);

        if(!carrito){
            await this.carritoRepository.createCarrito(userId);
            carrito = await this.carritoRepository.getCarritoByUserId(userId);
        }

        const variante = await this.varianteRepository.getVarianteById(varianteId);

        if(!variante) {
            throw new Error('La variante no existe');
        }

        if(variante.stock < cantidad){
            throw new Error('La cantidad supera al stock');
        }

        return await this.carritoRepository.agregarProductoAlCarrito(carrito!.id, varianteId, cantidad);
    }

    async eliminarProductoDelCarrito(userId:number, varianteId:number){
        let carrito = await this.carritoRepository.getCarritoByUserId(userId);

        if(!carrito){
            await this.carritoRepository.createCarrito(userId);
            carrito = await this.carritoRepository.getCarritoByUserId(userId);
        }

        return await this.carritoRepository.eliminarProductoDelCarrito(carrito!.id, varianteId);
    }
}