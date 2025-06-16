const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME, // Connect to TestDB after it's created
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const dbConnect = async () => {
  try {
    await sql.connect(config);
    console.log("✅ Connected to MSSQL");
  } catch (error) {
    throw error;
  }
};

module.exports = dbConnect;
