import { Router } from "express";
import productoRouter from './productoRouter/producto.routes';

export class AppRoutes{

    static get routes(): Router {
        const router = Router();

        router.use('/api/producto', productoRouter)

        return router;
    }

}
