// service
const ActorService = require('../services/ActorService');

class ActorController {
  async index(request, response) {
    try {
      const actorService = new ActorService();
      const rows = await actorService.selectAll();

      return response.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const actorService = new ActorService();
      const data = await actorService.select(id);

      return response.status(200).json(data);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async create(request, response) {
    try {
      const { id, name, birth_date } = request.body;

      const actorService = new ActorService();
      const data = await actorService.insert({ id, name, birth_date });

      return response.status(201).json(data);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async update(request, response) {
    try {
      const { name, birth_date } = request.body;
      const { id } = request.params;

      if (name === undefined && birth_date === undefined) {
        return response.status(400).json({
          error: 'Informe pelo menos um campo para atualizar o filme'
        });
      }

      const actorService = new ActorService();
      const info = await actorService.update({ name, birth_date }, id);

      return response.status(200).json(info);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const actorService = new ActorService();
      const info = await actorService.delete(id);

      return response.status(200).json(info);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }
}

module.exports = ActorController;
