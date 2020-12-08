const { Router } = require('express');
// controller
const MovieController = require('../controllers/MovieController');

const movieController = new MovieController();
const moviesRouter = Router();

// rota para listar todos os filmes
moviesRouter.get('/', movieController.index);

// rota para listar um filme específico a partir do seu identificador
moviesRouter.get('/:id', movieController.show);

// rota para cadastrar um filme
moviesRouter.post('/', movieController.create);

// rota para atualizar um filme a partir do seu identificador
moviesRouter.put('/:id', movieController.update);

// rota para remover um filme a partir do seu identificador
moviesRouter.delete('/:id', movieController.delete);

module.exports = moviesRouter;
