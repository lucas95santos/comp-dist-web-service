require('dotenv/config');
const mysql = require('mysql2/promise');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  try {
    const connection = await mysql.createConnection(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    global.connection = connection;

    console.log('Connection established with the database');

    return connection;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connect };
