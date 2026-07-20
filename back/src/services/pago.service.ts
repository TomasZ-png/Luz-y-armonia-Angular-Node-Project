import axios from 'axios';
import { CompraRepository } from '../repository/compra.repository';
import { VarianteProducto } from '@prisma/client';

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;
const MP_API_URL = 'https://api.mercadopago.com/checkout/preferences';

console.log('🔑 MP TOKEN EN SERVICE:', MP_ACCESS_TOKEN?.substring(0, 20) + '...');

export class MercadoPagoService {

  constructor(private compraRepository: CompraRepository){}

  async crearPreferencia(compraId: number) {
    const compra = await this.compraRepository.getCompraById(compraId);

    if(!compra){
      throw new Error('La compra no existe');
    }

    if(!['CREADA', 'PENDIENTE_PAGO'].includes(compra.estado)){
      throw new Error('El estado de la compra ya no es "Creada" para pagar.');
    }

    console.log('📥 COMPRA RECIBIDA:', JSON.stringify(compra, null, 2));
    
    const items = await this.compraRepository.getItemsOfCompraByCompraId(compraId);

    if (!items || items.length === 0) {
      throw new Error('La compra debe tener al menos un item');
    }

    const preference = {
      items: items.map(item => ({
        id: item.VarianteProducto.id.toString(),
        title: item.VarianteProducto.Producto.nombre,
        quantity: item.cantidad,
        unit_price: item.VarianteProducto.precio,
        currency_id: 'ARS',
      })),
      external_reference: compra.id.toString(),
      back_urls: {
        success: 'http://localhost:4200/pago-exitoso',
        failure: 'http://localhost:4200/pago-fallido',
        pending: 'http://localhost:4200/pago-pendiente',
      },

      // notification_url: process.env.MP_WEBHOOK_URL || 'http://localhost:3000/webhook/mercadopago',
      notification_url: "https://unbewitching-fungistatic-earl.ngrok-free.dev/api/webhook/mercadopago"
    };

    const response = await axios.post(MP_API_URL, preference, {
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`
      }
    });

    await this.compraRepository.actualizarEstadoCompra(compraId, 'PENDIENTE_PAGO');

    return {
      preferenceId: response.data.id,
      initPoint: response.data.init_point
    }
  }
}
