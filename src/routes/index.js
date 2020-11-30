const { Router } = require('express');
// all routes
const moviesRouter = require('./movies.routes');

const routes = Router();

routes.use('/movies', moviesRouter);

module.exports = routes;
