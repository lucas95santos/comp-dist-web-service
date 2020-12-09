const xml = require('xml2js');
// service
const MovieService = require('../services/MovieService');

class MovieController {
  async index(request, response) {
    try {
      const movieService = new MovieService();
      const rows = await movieService.selectAll();

      return response.status(200).json(rows);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  async show(request, response) {
    const { id } = request.params;
    const xmlBuilder = new xml.Builder();

    const [realId, type] = String(id).split('.');

    const responseFormat = type && type === 'xml' ? 1 : !type || type === 'json' ? 0 : null;

    try {
      const movieService = new MovieService();
      const data = await movieService.select(realId);

      switch (responseFormat) {
        case 1:
          response.set('Content-Type', 'text/xml');
          return response.status(200).send(xmlBuilder.buildObject(data));
        case 0:
          return response.status(200).json(data);
      }
    } catch (err) {
      switch (responseFormat) {
        case 1:
          response.set('Content-Type', 'text/xml');
          return response.status(400).send(xmlBuilder.buildObject({
            error: err.message
          }));
        case 0:
          return response.status(400).json({
            error: err.message
          });
      }
    }
  }

  async showActors(request, response) {
    try {
      const { id } = request.params;

      const movieService = new MovieService();
      const data = await movieService.selectActors(id);

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
