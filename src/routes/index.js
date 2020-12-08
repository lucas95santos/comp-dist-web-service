const { Router } = require('express');
// all routes
const moviesRouter = require('./movies.routes');
const actorsRouter = require('./actors.routes');

const routes = Router();

routes.use('/movies', moviesRouter);
routes.use('/actors', actorsRouter);

module.exports = routes;
