import express, {type Request, type Response} from 'express';
import { AppRoutes } from './routes/routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// // Healthcheck
// app.get('/ping', (_req: Request, res: Response) => {
//     res.status(200).send('pong');
// });

app.use(AppRoutes.routes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});