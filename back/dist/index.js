import express from 'express';
import { AppRoutes } from './routes/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { jwtMiddleware } from './middlewares/jwt.middleware';
const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwtMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/api', AppRoutes.routes);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map