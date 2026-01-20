import { Router } from "express";
import { AromaController } from "../../controllers/aroma.controller";
const aromaRouter = Router();
const aromaController = new AromaController();
aromaRouter.get('/', aromaController.getAll.bind(aromaController));
aromaRouter.post('/agregar', aromaController.create.bind(aromaController));
aromaRouter.delete('/eliminar/:id', aromaController.delete.bind(aromaController));
export default aromaRouter;
//# sourceMappingURL=aroma.routes.js.map