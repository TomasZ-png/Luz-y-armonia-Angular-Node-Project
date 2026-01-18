import { Router } from "express";
import { FavoritoController } from "../../controllers/favorito.controller";

const favoritoRouter = Router();
const favoritoController = new FavoritoController();

favoritoRouter.get('/', favoritoController.getFavoritos.bind(favoritoController));
favoritoRouter.post('/agregar/:id', favoritoController.agregarAFavoritos.bind(favoritoController));
favoritoRouter.delete('/eliminar/:id', favoritoController.eliminarDeFavoritos.bind(favoritoController));

export default favoritoRouter;