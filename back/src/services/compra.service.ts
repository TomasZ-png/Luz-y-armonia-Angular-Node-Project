    import { Producto_Compra } from "@prisma/client";
    import { CompraRepository } from "../repository/compra.repository";
    import { MiCarritoRepository } from "../repository/miCarrito.repository";
    import { ProductoRepository } from "../repository/producto.repository";
import { VarianteRepository } from "../repository/variante.repository";
import { prisma } from "../prisma";
import { error } from "console";

    export class CompraService {

        constructor(
            private compraRepository: CompraRepository,
            private productoRepository: ProductoRepository,
            private carritoRepository: MiCarritoRepository,
            private varianteRepository: VarianteRepository
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

        async comprarUnidad (idUsuario: number, idVariante: number, cantidad: number){
            const variante = await this.varianteRepository.getVarianteById(idVariante);
            
            if(variante!.stock < cantidad){
                throw new Error('La cantidad supera el stock del producto');
            }

            const compra = await this.compraRepository.createCompra(idUsuario);
            
            await this.compraRepository.crearProductoCompra(
                idVariante, cantidad, compra.id
            );

            const total = variante!.precio * cantidad;
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
                    item.VarianteProducto.id,
                    item.cantidad,
                    compra.id
                );

                total += item.VarianteProducto.precio * item.cantidad;
            }

            await this.compraRepository.actualizarTotal(compra.id, total);
            await this.carritoRepository.vaciarCarrito(carritoUser!.id);

            return compra;
        }

        async getCompras(idUsuario:number){
            const compras = await this.compraRepository.getAllByUser(idUsuario);

            for(const compra of compras){
                await this.expirarCompra(compra.id);
            }

            return compras;
        }

        async expirarCompra(idCompra:number){
            const compra = await this.compraRepository.getCompraById(idCompra);

            if(!compra){
                throw new Error('La compra no existe');
            }

            if(['PENDIENTE_PAGO', 'CREADA'].includes(compra.estado)){
                const now = Date.now();
                const compraDate = new Date(compra.fecha).getTime();
                
                const horas24 = 1000 * 60 * 60 * 24;

                if(now - compraDate > horas24){
                    await this.compraRepository.actualizarEstadoCompra(idCompra, 'EXPIRADA');
                }
            }
        }

        async marcarCompraComoPagada(compraId:number){
            const compra = await this.compraRepository.getCompraById(compraId);

            if(!compra){
                console.log('La compra no existe');
                throw new Error('La compra no existe');
            }

            if(!['PENDIENTE_PAGO'].includes(compra.estado)){
                console.log('El estado de la compra no es pendiente de pago, no se puede marcar como pagada');
                return;
            }
                        
            await prisma.$transaction(async (tx) => {
                const productos = await tx.producto_Compra.findMany({
                    where: {idCompra: compraId},
                    include: {VarianteProducto: true}
                });

                if(productos.length === 0){
                    throw new Error('La compra no posee productos.')
                }

                for(const item of productos){
                    if(item.VarianteProducto.stock < item.cantidad){
                        throw new Error('Stock insuficiente.');
                    }
                }

                for(const item of productos){
                    await tx.varianteProducto.update({
                        where: { id: item.VarianteProducto.id },
                        data: { 
                            stock: {
                                decrement: item.cantidad
                            },
                        }
                    });

                    const varianteActualizada = await tx.varianteProducto.findUnique({
                        where: {id: item.VarianteProducto.id}
                    });

                    await tx.varianteProducto.update({
                        where: {id: item.VarianteProducto.id},
                        data: {
                            estado: varianteActualizada?.stock === 0 ? 'AGOTADO' : 'DISPONIBLE'
                        }
                    });

                    const variantes = await tx.varianteProducto.findMany({
                        where: {idProducto: item.VarianteProducto.idProducto}
                    });

                    const tieneStock = variantes.some(v=>v.stock>0);

                    await tx.producto.update({
                        where:{id: item.VarianteProducto.idProducto},
                        data:{estadoProducto: tieneStock ? 'DISPONIBLE' : 'AGOTADO'}
                    });
                }

                await tx.compra.update({
                    where:{id:compraId},
                    data: {estado: 'PAGADA'}
                });
            })
        }

        async marcarCompraComoCancelada(compraId:number){
            const compra = await this.compraRepository.getCompraById(compraId);

            if(!compra){
                throw new Error('La compra no existe');
            }

            await this.compraRepository.actualizarEstadoCompra(compraId, 'CANCELADA');
        }
    }