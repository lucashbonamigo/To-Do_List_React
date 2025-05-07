import pool from "../database/db.js";
export const getTasks = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM task WHERE user_id = ?;";
        pool.query(sql, [id], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
export const createTask = async (task) => {
    return new Promise((resolve, reject) => {
        const sql = `
        INSERT INTO task(content, deadline, user_id, status, tab_task, repetitions, hours)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        pool.query(sql, [
            task.content,
            task.deadline,
            task.user_id,
            task.status,
            task.tab_task,
            task.repetitions,
            task.estimatedTime
        ], (err, result) => {
            if (err)
                return reject(err);
            const createdTask = {
                ...task,
                id: result.insertId
            };
            resolve(createdTask);
        });
    });
};
export const updateTask = async (task) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE task SET status = ?, content = ?, deadline = ?, tab_task = ?, repetitions = ?, hours = ? WHERE id = ?;";
        pool.query(sql, [task.status, task.content, task.deadline, task.tab_task, task.repetitions, task.estimatedTime, task.id], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
export const deleteTask = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM task WHERE id = ?;";
        pool.query(sql, [id], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
