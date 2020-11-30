const express = require('express');

const server = express();
const PORT = 8080;

server.use(express.json());

server.get('/', (req, res) => {
  res.json({
    message: 'Hello world adsdas'
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
