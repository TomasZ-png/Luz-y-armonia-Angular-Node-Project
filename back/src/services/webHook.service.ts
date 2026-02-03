import axios from 'axios';
import { CompraService } from './compra.service';

export class WebHookService {

    constructor(private compraService: CompraService){}

    async procesarEvento(req: any) {

        const type =
            req.body?.type ||
            req.query?.type ||
            req.query?.topic;

        if (type !== 'payment') {
            console.log('⏭ Evento ignorado:', type);
            return;
        }

        const paymentId =
            req.body?.data?.id ||
            req.query?.id;

        if (!paymentId) {
            throw new Error('No se recibió paymentId');
        }

        console.log('💳 Payment ID recibido:', paymentId);

        const paymentResponse = await axios.get(
            `https://api.mercadopago.com/v1/payments/${paymentId}`,
            {
            headers: {
                Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
            }
        );

        const payment = paymentResponse.data;
        const estadoPago = payment.status;
        const compraId = payment.external_reference;

        console.log('📦 Estado pago:', estadoPago);
        console.log('🧾 Compra ID:', compraId);

        if (!compraId) {
            throw new Error('Pago sin external_reference');
        }

        if (estadoPago === 'approved') {
            await this.compraService.marcarCompraComoPagada(Number(compraId));
        }

        if (estadoPago === 'rejected') {
            await this.compraService.marcarCompraComoCancelada(Number(compraId));
        }
    }
}