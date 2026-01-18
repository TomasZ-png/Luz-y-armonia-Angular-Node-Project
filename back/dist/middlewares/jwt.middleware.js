import jwt from 'jsonwebtoken';
export const jwtMiddleware = (req, res, next) => {
    try {
        console.log('JWT middleware ejecutado');
        const token = req.cookies?.token;
        if (!token) {
            // Si no hay token, continuar (las rutas protegidas verificarán)
            return next();
        }
        console.log('COOKIE TOKEN:', req.cookies?.token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
        req.user = { id: Number(decoded.sub) };
        console.log('USER EN JWT:', req.user);
        next();
    }
    catch (error) {
        // Token inválido o expirado, continuar sin usuario
        console.error('JWT Error:', error.message);
        next();
    }
};
export const isAuthenticated = (req, res, next) => {
    if (!req.user?.id) {
        return res.status(401).json({ error: 'No autenticado' });
    }
    next();
};
//# sourceMappingURL=jwt.middleware.js.map