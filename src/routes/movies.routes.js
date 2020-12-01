const { Router } = require('express');
// controller
const MovieController = require('../controllers/MovieController');

const movieController = new MovieController();
const moviesRouter = Router();

moviesRouter.get('/', movieController.selectAll);

module.exports = moviesRouter;
