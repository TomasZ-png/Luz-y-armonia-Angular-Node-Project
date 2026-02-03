import { type Request, type Response} from 'express';
import { CompraRepository } from "../repository/compra.repository";
import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { ProductoRepository } from "../repository/producto.repository";
import { CompraService } from "../services/compra.service";
import { WebHookService } from "../services/webHook.service";

const compraRepository = new CompraRepository()
const productoRepository = new ProductoRepository()
const carritoRepository = new MiCarritoRepository()
const compraService = new CompraService(compraRepository, productoRepository, carritoRepository);
const webhookService = new WebHookService(compraService);

export class WebhookController {
    async recibir(req:Request, res:Response){
        try {
            console.log('🔔 Webhook recibido');
            await webhookService.procesarEvento(req);
            res.status(200).json('Exito');
        } catch (error:any) {
            console.error('🔥 Error webhook:', error.message);
            res.status(500).json({error: error.message});
        }
    }
}