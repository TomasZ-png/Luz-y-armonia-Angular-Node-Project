import { Router } from "express";
import productoRouter from './productoRouter/producto.routes';
import usuarioRouter from "./usuarioRouter/usuario.routes";
import aromaRouter from "./aromaRouter/aroma.routes";
import tipoProductoRouter from "./tipoProductosRouter/tipoProductos.routes";
import carritoRouter from "./carrito/carrito.routes";

export class AppRoutes{

    static get routes(): Router {
        const router = Router();

        router.use('/api/producto', productoRouter)
        router.use('/api/usuario', usuarioRouter)
        router.use('/api/aroma', aromaRouter)
        router.use('/api/tipoProducto', tipoProductoRouter)
        router.use('/api/carrito', carritoRouter)

        return router;
    }

}
