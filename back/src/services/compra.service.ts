import { CompraRepository } from "../repository/compra.repository";
import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { ProductoRepository } from "../repository/producto.repository";

export class CompraService {

    constructor(
        private compraRepository: CompraRepository,
        private productoRepository: ProductoRepository,
        private carritoRepository: MiCarritoRepository
    ){}

    async comprarUnidad (idUsuario: number, idProducto: number, cantidad: number){
        const producto = await this.productoRepository.getProductById(idProducto);
        
        if(producto!.stock < cantidad){
            throw new Error('La cantidad supera el stock del producto');
        }

        const compra = await this.compraRepository.createCompra(idUsuario);
        
        await this.compraRepository.crearProductoCompra(
            idProducto, cantidad, compra.id
        );

        const total = producto!.precio * cantidad;
        await this.compraRepository.actualizarTotal(compra.id, total);

        const nuevoStock = producto!.stock - cantidad;
        await this.productoRepository.actualizarStock(idProducto, nuevoStock);

        return compra;
    }

    async comprarCarrito(idUsuario:number){
        const carritoUser = await this.carritoRepository.getCarritoByUserId(idUsuario);

        if((carritoUser!.Mi_Carrito_Producto).length === 0){
            throw new Error('El carrito esta vacio');
        }

        const compra = await this.compraRepository.createCompra(idUsuario);

        let total = 0;

        for(const item of carritoUser!.Mi_Carrito_Producto){
            await this.compraRepository.crearProductoCompra(
                item.Producto.id,
                item.cantidad,
                compra.id
            );

            const nuevoStock = item.Producto.stock - item.cantidad;

            await this.productoRepository.actualizarStock(item.Producto.id, nuevoStock);

            total += item.Producto.precio * item.cantidad;
        }

        

        await this.compraRepository.actualizarTotal(compra.id, total);
        await this.carritoRepository.vaciarCarrito(carritoUser!.id);

        return compra;
    }

    async getCompras(idUsuario:number){
        return await this.compraRepository.getAllByUser(idUsuario);
    }
}