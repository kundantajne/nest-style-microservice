const sql = require('mssql');
const User = require('../entities/user.model');



const createUser = async (name, email) => {
  const result = await sql.query`
    INSERT INTO users (name, email)
    OUTPUT INSERTED.*
    VALUES (${name}, ${email})
  `;
  return new User(result.recordset[0]);
};

const getAllUsers = async () => {
  const result = await sql.query`SELECT * FROM users`;
  const x = result;
  return result.recordset.map(row => new User(row));
};

module.exports = {
  createUser,
  getAllUsers
};
