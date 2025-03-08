import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'})

const pool = mysql2.createPool({
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexões no pool
    queueLimit: 0        // Sem limite de requisições na fila
});

export default pool;