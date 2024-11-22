const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const testConnection = async () => {
    try {
        const [rows] = await db.execute('SELECT 1 AS test');
        console.log('Successfully connected to the database!');
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
    }
};

testConnection();

module.exports = db;
