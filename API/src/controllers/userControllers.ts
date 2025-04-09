import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService.js';
import { RequestHandler } from 'express';

export const registerUser: RequestHandler = asyncHandler(async(req, res) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ erro: "usuario ou senha inválidos" })
        }
        await userService.registerUser(usuario, pass)
        res.status(201).json({ message: "usuário cadastrado com sucesso" })
        
    } catch (error) {
        console.log("erro interno", error && (error as any).message)
        res.status(500).json({ erro: "erro interno do servidor" });
    }
});

export const loginUser: RequestHandler = asyncHandler(async(req, res) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ "erro": "usuário e senha requeridas" })
        }
        await userService.loginUser(usuario, pass)
        res.status(200).json({ message: "usuário logado com sucesso" })
    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})