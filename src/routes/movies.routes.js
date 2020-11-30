const { Router } = require('express');

const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
  res.json({
    message: 'Movies'
  });
});

module.exports = moviesRouter;
