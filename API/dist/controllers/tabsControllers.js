import asyncHandler from 'express-async-handler';
import pool from '../config/database.js';
export const addTabs = asyncHandler(async (req, res) => {
    try {
        const { name, description, user_id } = req.body;
        if (!name || !user_id) {
            res.status(400).json({ erro: "Nome da Tab é obrigatório" });
        }
        const sql = "INSERT INTO tabs(name, description, user_id) VALUES (?, ?, ?)";
        pool.query(sql, [name, description, user_id], (err, results) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }
            return res.status(201).json({ sucess: "tab Criada" });
        });
    }
    catch (error) {
        console.log("erro no servidor", error);
        res.status(500).json({ erro: "erro de servidor" });
    }
});
export const updateTabs = asyncHandler(async (req, res) => {
    try {
        const { name, description, id } = req.body;
        const sql = "UPDATE tabs SET name = ?, description = ? WHERE id = ?;";
        pool.query(sql, [name, description, id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor',
                    results
                });
            }
            if (results.affectedRows > 0) {
                res.status(200).json({ results });
            }
            else {
                console.log(results);
                res.status(404).json({ error: 'erro ao atualizar tab' });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro de servidor", error });
    }
});
export const deleteTabs = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;
        const sql = "DELETE FROM tabs WHERE id = ?";
        pool.query(sql, [id], (err, results) => {
            console.log(results);
            console.log(err);
            console.log(id);
            if (err) {
                console.log(err);
                return res.status(400).json({ erro: err });
            }
            res.status(200).json({ sucess: "DELETADO COM SUCESSO" });
        });
    }
    catch (err) {
        res.status(500).json({ erro: "Erro de servidor" });
    }
});
export const getTabs = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;
        const sql = "SELECT * FROM tabs WHERE user_id = ?;";
        pool.query(sql, [id], (err, results) => {
            if (err) {
                res.status(500).json({ erro: "erro de banco de dados" });
            }
            res.status(200).send(results);
        });
    }
    catch (error) {
        console.log("erro de servidor", error);
        res.status(500).send({ erro: "erro de servidor" });
    }
});
