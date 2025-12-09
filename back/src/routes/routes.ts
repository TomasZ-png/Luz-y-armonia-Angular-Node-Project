import { Router } from "express";
import productoRouter from './productoRouter/producto.routes';
import usuarioRouter from "./usuarioRouter/usuario.routes";

export class AppRoutes{

    static get routes(): Router {
        const router = Router();

        router.use('/api/producto', productoRouter)
        router.use('/api/usuario', usuarioRouter)

        return router;
    }

}
