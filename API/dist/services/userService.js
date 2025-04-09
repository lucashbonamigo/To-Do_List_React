import pool from "../database/db.js";
export const registerUser = async (usuario, pass) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO logins value(?, ?, ?)";
        pool.query(sql, ["id", usuario, pass], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
export const loginUser = async (usuario, pass) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM logins WHERE usuario = ? AND pass = ?";
        pool.query(sql, [usuario, pass], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
