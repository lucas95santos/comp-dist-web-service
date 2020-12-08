const { connect } = require('../database/connection');

class MovieService {
  async selectAll() {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT * FROM movies`);

    if (!rows)
      throw new Error('Erro ao buscar filmes');

    console.log('SELECT * FROM movies');

    return rows;
  }

  async select(id) {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT DISTINCT * FROM movies WHERE id=${id}`);

    if (!rows)
      throw new Error(`Não existe filme com o id ${id}`);

    console.log(`SELECT DISTINCT * FROM movies WHERE id=${id}`);

    return rows[0];
  }

  async insert(movie) {
    const connection = await connect();

    const { id, title, synopsis } = movie;

    const sql = 'INSERT INTO movies (id, title, synopsis) VALUES (?, ?, ?)';
    const values = [id, title, synopsis];

    const data =  await connection.query(sql, values);

    if (!data)
      throw new Error('Erro ao inserir filme');

    console.log(`INSERT INTO movies (id, title, synopsis) VALUES (${id}, ${title}, ${synopsis})`);

    const fullData = await this.select(id);

    if (!fullData)
      throw new Error('Erro ao retornar novo filme');

    return fullData;
  }

  async update(body, id) {
    const data = await this.select(id);

    if (!data)
      throw new Error(`Não existe filme com o id ${id}`);

    const connection = await connect();

    let sql = 'UPDATE movies SET ';

    const values = [];
    const fields = Object.keys(body);

    fields.forEach(field => {
      if (body[field] !== undefined) {
        values.push(body[field]);
        sql += `${field}=?, `
      }
    });

    values.push(parseInt(id));

    sql += 'WHERE id=?';
    sql = sql.replace(', W', ' W');

    const updatedData = await connection.query(sql, values);

    if (!updatedData)
      throw new Error('Erro ao remover filme');

    console.log(sql);

    return `Filme com o id ${id} atualizado`;
  }

  async delete(id){
    const data = await this.select(id);

    if (!data)
      throw new Error(`Não existe filme com o id ${id}`);

    const connection = await connect();

    const sql = 'DELETE FROM movies WHERE id=?';
    const deletedData = await connection.query(sql, [id]);

    if (!deletedData)
      throw new Error('Erro ao remover filme');

    console.log(`DELETE FROM movies WHERE id=${id}`);

    return `Filme com o id ${id} removido`;
  }
}

module.exports = MovieService;
