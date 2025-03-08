import asyncHandler from 'express-async-handler';
import pool from '../config/database.js';

export const registerUser = asyncHandler(async(req, res) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ erro: "usuario ou senha inválidos" })
        }

        const sql = "INSERT INTO logins value(?, ?, ?)"
        pool.query(sql, ["id", usuario, pass], (err, results) => {
            if (err) {
                console.log("erro ao executar query:", err);
                return res.status(400).json(err);
            }
            return res.status(201).json({message: "success"})
        })

    } catch (error) {
        console.log("erro interno", error && (error as any).message)
        res.status(500).json({ erro: "erro interno do servidor" });
    }
});

export const loginUser = asyncHandler(async(req, res) => {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) {
            res.status(400).json({ "erro": "usuário e senha requeridas" })
        }
        const sql = "SELECT * FROM logins WHERE user = ? AND pass = ?"

        pool.query(sql, [usuario, pass], (err, results) => {
            if (err) {
                console.error('Erro ao executar a query:', err);
                return res.status(500).json({ error: 'Erro no servidor',
                    results
                });
            }

            if (Array.isArray(results) && results.length > 0) {
                res.status(200).json({ message: 'Success', results });
            } else {
                res.status(404).json({ error: 'Usuário ou senha incorretos' });
            }
        })
    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
})