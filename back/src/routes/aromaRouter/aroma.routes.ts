import { Router } from "express";
import { AromaController } from "../../controllers/aroma.controller";

const aromaRouter = Router();
const aromaController = new AromaController();

aromaRouter.get('/', aromaController.getAll.bind(aromaController));

export default aromaRouter;