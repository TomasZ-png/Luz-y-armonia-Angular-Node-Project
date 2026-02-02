    import { Producto_Compra } from "@prisma/client";
    import { CompraRepository } from "../repository/compra.repository";
    import { MiCarritoRepository } from "../repository/miCarrito.repository";
    import { ProductoRepository } from "../repository/producto.repository";

    export class CompraService {

        constructor(
            private compraRepository: CompraRepository,
            private productoRepository: ProductoRepository,
            private carritoRepository: MiCarritoRepository
        ){}

        async getCompraById(idCompra: number){

            if(isNaN(idCompra)){
                throw new Error('El id de la compra no es un numero valido');
            }

            const compra = await this.compraRepository.getCompraById(idCompra);

            if(!compra){
                throw new Error('La compra no existe.');
            }

            return compra;
        }

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

                total += item.Producto.precio * item.cantidad;
            }

            await this.compraRepository.actualizarTotal(compra.id, total);
            await this.carritoRepository.vaciarCarrito(carritoUser!.id);

            return compra;
        }

        async getCompras(idUsuario:number){
            return await this.compraRepository.getAllByUser(idUsuario);
        }

        async marcarCompraComoPagada(compraId:number){
            const compra = await this.compraRepository.getCompraById(compraId);

            if(!compra){
                console.log('La compra no existe');
                throw new Error('La compra no existe');
            }

            if(!['PENDIENTE_PAGO', 'CREADA'].includes(compra.estado)){
                console.log('El estado de la compra no es pendiente de pago, no se puede marcar como pagada');
                return;
            }
            
            const productosDeLaCompra:Producto_Compra[] = await this.compraRepository.getItemsOfCompraByCompraId(compraId);
            
            for(const item of productosDeLaCompra){
                const producto = await this.productoRepository.getProductById(item.idProducto);

                if(!producto || producto.stock < item.cantidad){
                    throw new Error(`La cantidad elegida supera el stock del producto ${item.idProducto}`);
                }
            }

            for(const item of productosDeLaCompra){
                const producto = await this.productoRepository.getProductById(item.idProducto);

                const nuevoStock = producto!.stock - item.cantidad;
                await this.productoRepository.actualizarStock(item.idProducto, nuevoStock);
            }
            
            await this.compraRepository.actualizarEstadoCompra(compraId, 'PAGADA');
            console.log('Compra marcada como paga');
        }

        async marcarCompraComoCancelada(compraId:number){
            const compra = await this.compraRepository.getCompraById(compraId);

            if(!compra){
                throw new Error('La compra no existe');
            }

            await this.compraRepository.actualizarEstadoCompra(compraId, 'CANCELADA');
        }


    }