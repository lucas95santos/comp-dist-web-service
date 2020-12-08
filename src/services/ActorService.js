const { connect } = require('../database/connection');

const DEFAULT_TABLE = 'actors';

class ActorService {
  async selectAll() {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT * FROM ${DEFAULT_TABLE}`);

    if (!rows)
      throw new Error('Erro ao buscar atores');

    console.log('Listando todos os atores');

    return rows;
  }

  async select(id) {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT DISTINCT * FROM ${DEFAULT_TABLE} WHERE id=${id}`);

    if (!rows || rows.length === 0)
      throw new Error(`Não existe ator com o id ${id}`);

    console.log(`Listando o ator de id ${id}`);

    return rows[0];
  }

  async _privateSelect(id) {
    const connection = await connect();

    const [rows] = await connection.query(`SELECT DISTINCT * FROM ${DEFAULT_TABLE} WHERE id=${id}`);

    if (!rows || rows.length === 0)
      throw new Error(`Não existe ator com o id ${id}`);

    return rows[0];
  }

  async insert(movie) {
    const connection = await connect();

    const { id, name, birth_date } = movie;

    const sql = `INSERT INTO ${DEFAULT_TABLE} (id, name, birth_date) VALUES (?, ?, ?)`;
    const values = [id, name, birth_date];

    const data =  await connection.query(sql, values);

    if (!data)
      throw new Error('Erro ao inserir ator');

    console.log('Criando um novo ator');

    const fullData = await this._privateSelect(id);

    if (!fullData)
      throw new Error('Erro ao retornar novo ator');

    return fullData;
  }

  async update(body, id) {
    let data = await this._privateSelect(id);

    if (!data)
      throw new Error(`Não existe ator com o id ${id}`);

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
      throw new Error('Erro ao atualizar ator');

    console.log(`Ator com o id ${id} atualizado`);

    data = await this._privateSelect(id);

    if (!data)
      throw new Error('Erro ao retornar ator');

    return data;
  }

  async delete(id){
    const data = await this._privateSelect(id);

    if (!data)
      throw new Error(`Não existe ator com o id ${id}`);

    const connection = await connect();

    const sql = `DELETE FROM ${DEFAULT_TABLE} WHERE id=?`;
    const deletedData = await connection.query(sql, [id]);

    if (!deletedData)
      throw new Error('Erro ao remover ator');

    console.log(`Ator com o id ${id} removido`);

    return `Ator com o id ${id} removido`;
  }
}

module.exports = ActorService;
