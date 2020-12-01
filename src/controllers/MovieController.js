// service
const MovieService = require('../services/MovieService');

class MovieController {
  async selectAll(request, response) {
    try {
      const movieService = new MovieService();
      const rows = await movieService.selectAll();

      return response.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: err.message
      });
    }
  }

  async select(id) {

  }
}

module.exports = MovieController;
