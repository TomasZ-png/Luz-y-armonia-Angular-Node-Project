import { Request, Response } from 'express';
import { MercadoPagoService } from '../services/pago.service';
import { CompraRepository } from '../repository/compra.repository';

const compraRepository = new CompraRepository();
const mercadoPagoService = new MercadoPagoService(compraRepository);

export class MercadoPagoController{

    async crearPreferencia (req: Request, res: Response) {
        try {
            const { id } = req.body;
            const pref = await mercadoPagoService.crearPreferencia(id);
            res.json(pref);
        } catch (error: any) {
            // console.error('🔥 ERROR COMPLETO:', error);
            // console.error('🔥 RESPONSE DATA:', error?.response?.data);
            // console.error('🔥 RESPONSE STATUS:', error?.response?.status);
            // console.error('🔥 MESSAGE:', error?.message);
            res.status(500).json({ 
                error: 'Error creando preferencia',
                details: error?.response?.data || error?.message
            });
        }
    };
}
