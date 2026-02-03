import { Router } from 'express';
import { MercadoPagoController } from '../../controllers/pago.controller';

const mercadoPagoRouter = Router();
const mercadoPagoController = new MercadoPagoController();

mercadoPagoRouter.post('/preferencia', mercadoPagoController.crearPreferencia.bind(mercadoPagoController));

export default mercadoPagoRouter;
