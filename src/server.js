require('dotenv/config');
const express = require('express');
const { connect } = require('./database/connection');
const createTables = require('./database/createTables');
// routes
const routes = require('./routes');

// database connection and tables creations
connect();
createTables();

const server = express();
server.use(express.json());
server.use(routes);

const PORT = process.env.SERVER_PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
