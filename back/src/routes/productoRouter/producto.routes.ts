import { Router } from "express";
import { ProductoController } from "../../controllers/producto.controller";

const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.post("/agregar", productoController.createProduct.bind(productoController));

export default productoRouter;