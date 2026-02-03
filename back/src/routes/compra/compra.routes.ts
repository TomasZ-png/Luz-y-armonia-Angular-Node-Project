import { Router } from "express";
import { CompraController } from "../../controllers/compra.controller";

const compraRouter = Router();
const compraController = new CompraController();

compraRouter.get('/', compraController.getAllByUser.bind(compraController));
compraRouter.get('/:id', compraController.getCompraById.bind(compraController));
compraRouter.post('/producto/:id', compraController.comprarPorUnidad.bind(compraController));
compraRouter.post('/carrito', compraController.comprarCarrito.bind(compraController));

export default compraRouter; 