import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService.js';
import { NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface Usuario {
    id: number,
    username: string,
    pass: string
};

const secret: string = process.env.JWT_SECRET || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const registerUser: RequestHandler = asyncHandler(async (req, res, next: NextFunction) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ erro: "usuario ou senha inválidos" })
        }
        await userService.registerUser(usuario, pass)

        const user: Usuario = await userService.loginUser(usuario, pass);

        const token = jwt.sign({ id: user.id, username: user.username }, secret, {
            expiresIn: '1h',
        });
        res.status(201).json(token)

    } catch (error) {
        next(error)
    }
});

export const loginUser: RequestHandler = asyncHandler(async (req, res, next: NextFunction) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ "erro": "usuário e senha requeridas" })
        }
        const user: Usuario = await userService.loginUser(usuario, pass);

        const token = jwt.sign({ id: user.id, username: user.username }, secret, {
            expiresIn: '1h',
        });
        res.status(200).json(token)
    } catch (error) {
        next(error)
    }
})