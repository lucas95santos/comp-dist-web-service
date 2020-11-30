require('dotenv/config');
const express = require('express');
// routes
const routes = require('./routes');

const server = express();
server.use(express.json());
server.use(routes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
