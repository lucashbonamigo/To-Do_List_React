import pool from "../database/db.js";
export const createTab = (tab) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO tabs(name, description, user_id) VALUES (?, ?, ?)";
        pool.query(sql, [tab.name, tab.description, tab.user_id], (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
};
export const updateTab = (tab, id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE tabs SET name = ?, description = ? WHERE id = ?;";
        pool.query(sql, [tab.name, tab.description, id], (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
};
export const deleteTabs = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM tabs WHERE id = ?";
        pool.query(sql, [id], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
export const getTabs = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tabs WHERE user_id = ?;";
        pool.query(sql, [id], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
