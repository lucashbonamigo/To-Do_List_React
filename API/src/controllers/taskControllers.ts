import asyncHandler from 'express-async-handler';
import pool from '../config/database.js';

export const getTasks = asyncHandler(async(req, res) => {
    try {
        const { id } = req.query;
        const sql = "SELECT * FROM task WHERE user_id = ?;"
        pool.query(sql, [id], (err, results) => {
            if (err) {
                res.status(500).json({ erro: "erro de banco de dados" })
            }
            res.status(200).send(results);
        })
    } catch (error) {
        console.log("erro de servidor", error)
        res.status(500).send({ erro: "erro de servidor" })
    }
});

export const addTask = asyncHandler(async(req, res) => {
    try {
        const { novaTarefa, deadline, userID, states } = req.body;
        if (!novaTarefa) {
            res.status(400)
        }

        const sql = "INSERT INTO task(task, deadline, user_id, status) VALUES (?, ?, ?, ?)"

        pool.query(sql, [novaTarefa, deadline, userID, states], (err, results) => {
            if (err) {
                console.log("erro de query nas tasks:", err);
                return res.status(500).json({ erro: err })
            }
            return res.status(200).json({ sucess: "Task Adicionada" })
        })
    } catch (error) {
        console.log("erro no servidor", error)
        res.status(500).json({ erro: "erro de servidor" })
    }
});

export const updateTask = asyncHandler(async(req, res)=>{
    try {
        const {id, status} = req.body;
        const sql = "UPDATE task SET status = ? WHERE id = ?;"
        pool.query(sql, [status, id], (err, results)=>{
            if (err) {
                console.error('Erro ao executar a query:', err);
                return res.status(500).json({ error: 'Erro no servidor',
                    results
                });
            }

            if ((results as any).affectedRows > 0) {
                res.status(200).json({results });
            } else {
                console.log(results)
                res.status(404).json({ error: 'erro ao mudar status da query' });
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({erro: "Erro de servidor", error})
    }
});

export const deleteTask = asyncHandler(async(req, res) => {
    try {
        const { id } = req.body;
        const sql = "DELETE FROM task WHERE id = ?";
        pool.query(sql, [id], (err, results) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ erro: err })
            }

            res.status(200).json({ sucess: "DELETADO COM SUCESSO" });
        })
    }catch(err){
        res.status(500).json({erro: "Erro de servidor"})
    }
});