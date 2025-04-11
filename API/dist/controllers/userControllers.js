import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService.js';
export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ erro: "usuario ou senha inválidos" });
        }
        await userService.registerUser(usuario, pass);
        res.status(201).json({ message: "usuário cadastrado com sucesso" });
    }
    catch (error) {
        next(error);
    }
});
export const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ "erro": "usuário e senha requeridas" });
        }
        await userService.loginUser(usuario, pass);
        res.status(200).json({ message: "usuário logado com sucesso" });
    }
    catch (error) {
        next(error);
    }
});
