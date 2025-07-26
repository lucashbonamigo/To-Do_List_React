import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
;
const secret = process.env.JWT_SECRET || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ erro: "usuario ou senha inválidos" });
        }
        await userService.registerUser(usuario, pass);
        const user = await userService.loginUser(usuario, pass);
        const token = jwt.sign({ id: user.id, username: user.username }, secret, {
            expiresIn: '1h',
        });
        res.status(201).json(token);
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
        const user = await userService.loginUser(usuario, pass);
        const token = jwt.sign({ id: user.id, username: user.username }, secret, {
            expiresIn: '1h',
        });
        console.log(token);
        res.status(200).json(token);
    }
    catch (error) {
        next(error);
    }
});
