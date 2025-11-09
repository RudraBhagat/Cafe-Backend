const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify pool for async/await use
const promisePool = pool.promise();

const query = async (sql, params) => {
  try {
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

const closeConnection = async () => {
  return new Promise((resolve, reject) => {
    pool.end((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  query,
  closeConnection
};
