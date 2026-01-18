import { Router } from "express";
import productoRouter from './productoRouter/producto.routes';
import usuarioRouter from "./usuarioRouter/usuario.routes";
import aromaRouter from "./aromaRouter/aroma.routes";
import tipoProductoRouter from "./tipoProductosRouter/tipoProductos.routes";
import carritoRouter from "./carrito/carrito.routes";
import favoritoRouter from "./favorito/favorito.routes";

export class AppRoutes{

    static get routes(): Router {
        const router = Router();

        router.use('/producto', productoRouter)
        router.use('/usuario', usuarioRouter)
        router.use('/aroma', aromaRouter)
        router.use('/tipoProducto', tipoProductoRouter)
        router.use('/carrito', carritoRouter)
        router.use('/favoritos', favoritoRouter)

        return router;
    }

}
