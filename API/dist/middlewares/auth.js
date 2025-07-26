import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
export default function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Faça Login para Continuar' });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Token inválido' });
        req.user = decoded;
        next();
    });
}
