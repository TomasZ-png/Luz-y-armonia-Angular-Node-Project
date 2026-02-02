import { Router } from "express";
import { WebhookController } from "../../controllers/webhook.controller";

const webhookRouter = Router();
const webhookController = new WebhookController();

webhookRouter.post("/mercadopago", webhookController.recibir.bind(webhookController));

export default webhookRouter;