import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService.js';
import { NextFunction, RequestHandler } from 'express';

export const registerUser: RequestHandler = asyncHandler(async(req, res, next: NextFunction) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ erro: "usuario ou senha inválidos" })
        }
        await userService.registerUser(usuario, pass)
        res.status(201).json({ message: "usuário cadastrado com sucesso" })
        
    } catch (error) {
        next(error)
    }
});

export const loginUser: RequestHandler = asyncHandler(async(req, res, next: NextFunction) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ "erro": "usuário e senha requeridas" })
        }
        await userService.loginUser(usuario, pass)
        res.status(200).json({ message: "usuário logado com sucesso" })
    } catch (error) {
        next(error)
    }
})