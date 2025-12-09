import { Router } from "express";
import { ProductoController } from "../../controllers/producto.controller";

const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.post("/agregar", productoController.createProduct.bind(productoController));
productoRouter.get("/", productoController.getAllProducts.bind(productoController));
productoRouter.get("/buscar", productoController.getProductByName.bind(productoController));
productoRouter.get("/:id", productoController.getProductById.bind(productoController));
productoRouter.delete("/eliminar/:id", productoController.deleteProduct.bind(productoController));
productoRouter.put("/modificar/:id", productoController.updateProduct.bind(productoController));

export default productoRouter;