const { connect } = require('../database/connection');

class MovieService {
  async selectAll() {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT * FROM movies`);

    if (!rows) {
      throw new Error('Erro ao buscar filmes');
    }

    console.log('SELECT * FROM movies');

    return rows;
  }
}

module.exports = MovieService;
