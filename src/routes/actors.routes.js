const { Router } = require('express');
// controller
const ActorController = require('../controllers/ActorController');

const actorController = new ActorController();
const actorsRouter = Router();

// rota para listar todos os filmes
actorsRouter.get('/', actorController.index);

// rota para listar um filme específico a partir do seu identificador
actorsRouter.get('/:id', actorController.show);

// rota para cadastrar um filme
actorsRouter.post('/', actorController.create);

// rota para atualizar um filme a partir do seu identificador
actorsRouter.put('/:id', actorController.update);

// rota para remover um filme a partir do seu identificador
actorsRouter.delete('/:id', actorController.delete);

module.exports = actorsRouter;
