const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const wait = ms => new Promise(res => setTimeout(res, ms));

const initDatabase = async (retries = 5, delay = 5000) => {
  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`⏳ DB Init attempt ${i}`);
      const pool = await sql.connect(config);

      // Create DB if not exists
      await pool.request().query("IF DB_ID('TestDB') IS NULL CREATE DATABASE TestDB");

      // Connect to new DB
      await sql.connect({ ...config, database: 'TestDB' });

      // Create users table
      await sql.query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
        CREATE TABLE users (
          id INT IDENTITY(1,1) PRIMARY KEY,
          name NVARCHAR(100),
          email NVARCHAR(100),
          created_at DATETIME DEFAULT GETDATE()
        );
      `);

      console.log("✅ users table ready");
      return;
    } catch (err) {
      console.error(`❌ DB Init attempt ${i} failed: ${err.message}`);
      if (i === retries) throw err;
      await wait(delay);
    }
  }
};

module.exports = initDatabase;
