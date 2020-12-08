// service
const MovieService = require('../services/MovieService');

class MovieController {
  async index(request, response) {
    try {
      const movieService = new MovieService();
      const rows = await movieService.selectAll();

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

      const movieService = new MovieService();
      const data = await movieService.select(id);

      return response.status(200).json(data);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async create(request, response) {
    try {
      const { id, title, synopsis } = request.body;

      const movieService = new MovieService();
      const data = await movieService.insert({ id, title, synopsis });

      return response.status(201).json(data);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async update(request, response) {
    try {
      const { title, synopsis } = request.body;
      const { id } = request.params;

      if (title === undefined && synopsis === undefined) {
        return response.status(400).json({
          error: 'Informe pelo menos um campo para atualizar o filme'
        });
      }

      const movieService = new MovieService();
      const info = await movieService.update({ title, synopsis }, id);

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

      const movieService = new MovieService();
      const info = await movieService.delete(id);

      return response.status(200).json(info);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }
}

module.exports = MovieController;
