require('dotenv/config');
const express = require('express');
const { connect } = require('./database/connection');
// routes
const routes = require('./routes');

// database connection
connect();

const server = express();
server.use(express.json());
server.use(routes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
