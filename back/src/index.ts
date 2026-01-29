import 'dotenv/config';
import express, {type Request, type Response} from 'express';
import { AppRoutes } from './routes/routes';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { jwtMiddleware } from './middlewares/jwt.middleware';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.post('/webhook/mercadopago', (req: Request, res: Response) => {
  console.log('Webhook recibido:', req.body);
  res.sendStatus(200);
});

// Test endpoint para Mercado Pago
app.post('/test/mercadopago', async (req: Request, res: Response) => {
  try {
    const preference = {
      items: [
        {
          id: 'test-item-1',
          title: 'Vela de prueba',
          quantity: 1,
          unit_price: 1000,
          currency_id: 'ARS',
        },
      ],
      external_reference: 'COMPRA_TEST_1',
      notification_url: process.env.MP_WEBHOOK_URL || 'http://localhost:3000/webhook/mercadopago',
      back_urls: {
        success: 'http://localhost:4200/pago-exitoso',
        failure: 'http://localhost:4200/pago-fallido',
        pending: 'http://localhost:4200/pago-pendiente',
      },
    };

    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preference,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN!}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      init_point: response.data.init_point,
      sandbox_init_point: response.data.sandbox_init_point,
    });
  } catch (error: any) {
    console.error('🔥 Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error creando preferencia' });
  }
});

app.use(jwtMiddleware);

app.use('/uploads', express.static('uploads'))
app.use('/api', AppRoutes.routes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
