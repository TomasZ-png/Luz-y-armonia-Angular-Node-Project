import axios from 'axios';
import { Compra } from '@prisma/client';

type CompraConItems = Compra & {
  items: {
    productoId: number;
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
};

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN!;
const MP_API_URL = 'https://api.mercadopago.com/checkout/preferences';

console.log('🔑 MP TOKEN EN SERVICE:', MP_ACCESS_TOKEN?.substring(0, 20) + '...');

export class MercadoPagoService {

  async crearPreferencia(compra: CompraConItems) {
    console.log('📥 COMPRA RECIBIDA:', JSON.stringify(compra, null, 2));

    if (!compra.items || compra.items.length === 0) {
      throw new Error('La compra debe tener al menos un item');
    }

    const preference = {
      items: compra.items.map(item => ({
        id: item.productoId.toString(),
        title: item.nombre,
        quantity: item.cantidad,
        unit_price: item.precio,
        currency_id: 'ARS',
      })),
      
      external_reference: compra.id.toString(),

      back_urls: {
        success: 'http://localhost:4200/pago-exitoso',
        failure: 'http://localhost:4200/pago-fallido',
        pending: 'http://localhost:4200/pago-pendiente',
      },

      notification_url: process.env.MP_WEBHOOK_URL || 'http://localhost:3000/webhook/mercadopago',
    };

    console.log('📦 PREFERENCE BODY:', JSON.stringify(preference, null, 2));
    console.log('🔑 TOKEN:', MP_ACCESS_TOKEN?.substring(0, 30) + '...');
    console.log('🌐 URL:', MP_API_URL);

    try {
      const response = await axios.post(MP_API_URL, preference, {
        headers: {
          'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('✅ RESPUESTA COMPLETA:', response.status, response.data.id);

      return {
        preferenceId: response.data.id,
        initPoint: response.data.init_point,
        sandboxInitPoint: response.data.sandbox_init_point,
      };
    } catch (error: any) {
      console.error('🔥 ERROR COMPLETO:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  }
}












// import { Compra } from '@prisma/client';
// import { MercadoPagoConfig, Preference } from 'mercadopago';

// type CompraConItems = Compra & {
//   items: {
//     productoId: number;
//     nombre: string;
//     cantidad: number;
//     precio: number;
//   }[];
// };

// mercadopago.configure({
//   access_token: process.env.MP_ACCESS_TOKEN!,
// });

// export class MercadoPagoService {

//   async crearPreferencia(compra: CompraConItems) {

//     // 🧪 armamos la preferencia
//     const preference = {
//       items: compra.items.map(item => ({
//         id: item.productoId.toString(),
//         title: item.nombre,
//         quantity: Number(item.cantidad),
//         unit_price: Number(item.precio),
//         currency_id: 'ARS',
//       })),

//       external_reference: compra.id.toString(),

//       back_urls: {
//         success: 'http://localhost:4200/pago-exitoso',
//         failure: 'http://localhost:4200/pago-fallido',
//       },

//       auto_return: 'approved',

//       notification_url:
//         'https://unbewitching-fungistatic-earl.ngrok-free.dev/webhook/mercadopago',
//     };

//     // 💳 llamada REAL a Mercado Pago
//     const response = await mercadopago.preferences.create(preference);

//     // 🔍 logs útiles mientras desarrollás
//     console.log('MP preference id:', response.body.id);
//     console.log('MP init_point:', response.body.init_point);

//     // 👉 esto es lo que después va a usar el front
//     return {
//       preferenceId: response.body.id,
//       initPoint: response.body.init_point,
//       sandboxInitPoint: response.body.sandbox_init_point,
//     };
//   }
// }
