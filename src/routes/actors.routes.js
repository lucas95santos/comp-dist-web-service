const { Router } = require('express');
// controller
const ActorController = require('../controllers/ActorController');

const actorController = new ActorController();
const actorsRouter = Router();

// rota para listar todos os atores
actorsRouter.get('/', actorController.index);

// rota para listar um ator específico a partir do seu identificador (retorna em json e em xml)
actorsRouter.get('/:id', actorController.show);

// rota para cadastrar um ator
actorsRouter.post('/', actorController.create);

// rota para atualizar um ator a partir do seu identificador
actorsRouter.put('/:id', actorController.update);

// rota para remover um ator a partir do seu identificador
actorsRouter.delete('/:id', actorController.delete);

module.exports = actorsRouter;
