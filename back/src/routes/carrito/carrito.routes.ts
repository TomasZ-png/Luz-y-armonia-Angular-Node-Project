import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller";
import { CarritoController } from "../../controllers/carrito.controller";

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.get("/", carritoController.getCarritoByUserId.bind(carritoController));
carritoRouter.post("/agregar/:id", carritoController.agregarProductoAlCarrito.bind(carritoController));
carritoRouter.delete("/eliminar/:id", carritoController.eliminarProductoAlCarrito.bind(carritoController));

export default carritoRouter;