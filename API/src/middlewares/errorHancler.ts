import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro:", err); // Mostra o erro no console
  res.status(500).json({ erro: "Erro interno do servidor" }); // Responde com erro padrão
};