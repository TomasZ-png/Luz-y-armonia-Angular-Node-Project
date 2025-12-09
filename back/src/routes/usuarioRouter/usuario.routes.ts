import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post("/registrarse", usuarioController.signUp.bind(usuarioController));
usuarioRouter.post("/login", usuarioController.login.bind(usuarioController));
usuarioRouter.get("/:id", usuarioController.getUserById.bind(usuarioController));

export default usuarioRouter;