import { Router } from "express";
import { TipoProductoController } from "../../controllers/tipoProductos.controller";
const tipoProductoRouter = Router();
const tipoProductoController = new TipoProductoController();
tipoProductoRouter.get("/", tipoProductoController.getAll.bind(tipoProductoController));
tipoProductoRouter.get("/:id", tipoProductoController.getById.bind(tipoProductoController));
export default tipoProductoRouter;
//# sourceMappingURL=tipoProductos.routes.js.map