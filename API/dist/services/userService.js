import pool from "../database/db.js";
import * as bcrypt from "bcrypt";
export const registerUser = async (usuario, pass) => {
    const passHash = await bcrypt.hash(pass, 8);
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO logins value(?, ?, ?)";
        pool.query(sql, ["id", usuario, passHash], (err, results) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
};
export const loginUser = async (usuario, pass) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM logins WHERE user = ?";
        pool.query(sql, [usuario], async (err, results) => {
            const rows = results;
            if (err)
                return reject(err);
            if (rows.length === 0)
                return reject("Usuário não encontrado");
            const user = rows[0];
            const senhaCorreta = await bcrypt.compare(pass, user.pass);
            if (!senhaCorreta)
                return reject("Senha incorreta");
            resolve(user);
        });
    });
};
