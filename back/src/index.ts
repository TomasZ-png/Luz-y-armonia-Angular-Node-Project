import express, {type Request, type Response} from 'express';
import { AppRoutes } from './routes/routes';
import cors from 'cors';
import path from 'path';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'))


app.use(AppRoutes.routes);

app.use('/api', AppRoutes.routes)



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
