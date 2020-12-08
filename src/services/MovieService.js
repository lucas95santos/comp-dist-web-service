const { connect } = require('../database/connection');

const DEFAULT_TABLE = 'movies';

class MovieService {
  async selectAll() {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT * FROM ${DEFAULT_TABLE}`);

    if (!rows)
      throw new Error('Erro ao buscar filmes');

    console.log('Listando todos os filmes');

    return rows;
  }

  async select(id) {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT DISTINCT * FROM ${DEFAULT_TABLE} WHERE id=${id}`);

    if (!rows || rows.length === 0)
      throw new Error(`Não existe filme com o id ${id}`);

    console.log(`Listando o filme de id ${id}`);

    return rows[0];
  }

  async _privateSelect(id) {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT DISTINCT * FROM ${DEFAULT_TABLE} WHERE id=${id}`);

    if (!rows || rows.length === 0)
      throw new Error(`Não existe filme com o id ${id}`);

    return rows[0];
  }

  async insert(movie) {
    const connection = await connect();

    const { id, title, synopsis } = movie;

    const sql = `INSERT INTO ${DEFAULT_TABLE} (id, title, synopsis) VALUES (?, ?, ?)`;
    const values = [id, title, synopsis];

    const data =  await connection.query(sql, values);

    if (!data)
      throw new Error('Erro ao inserir filme');

    console.log('Criando um novo filme');

    const fullData = await this.select(id);

    if (!fullData)
      throw new Error('Erro ao retornar novo filme');

    return fullData;
  }

  async update(body, id) {
    let data = await this._privateSelect(id);

    if (!data)
      throw new Error(`Não existe filme com o id ${id}`);

    const connection = await connect();

    let sql = `UPDATE ${DEFAULT_TABLE} SET `;

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

    console.log(`Filme com o id ${id} atualizado`);

    data = await this._privateSelect(id);

    if (!data)
      throw new Error('Erro ao retornar filme');

    return data;
  }

  async delete(id){
    const data = await this._privateSelect(id);

    if (!data)
      throw new Error(`Não existe filme com o id ${id}`);

    const connection = await connect();

    const sql = `DELETE FROM ${DEFAULT_TABLE} WHERE id=?`;
    const deletedData = await connection.query(sql, [id]);

    if (!deletedData)
      throw new Error('Erro ao remover filme');

    console.log(`Filme com o id ${id} removido`);

    return `Filme com o id ${id} removido`;
  }
}

module.exports = MovieService;
