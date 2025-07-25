import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../controllers/userControllers";

const secret = process.env.JWT_SECRET as string;

export interface AuthenticatedRequest extends Request {
  user?: Usuario;
}

export default function authenticateToken(
  req: any,
  res: any,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Faça Login para Continuar' });
  }

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = decoded as Usuario;
    next();
  });
}
