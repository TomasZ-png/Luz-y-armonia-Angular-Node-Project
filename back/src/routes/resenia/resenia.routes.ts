import { Router } from "express";
import { ReseniaController } from "../../controllers/resenia.controller";

const reseniaRouter = Router();
const reseniaController = new ReseniaController();

reseniaRouter.get('/:id', reseniaController.getReseniaByProduct.bind(reseniaController));
reseniaRouter.post('/calificar/:id', reseniaController.createResenia.bind(reseniaController));

export default reseniaRouter;