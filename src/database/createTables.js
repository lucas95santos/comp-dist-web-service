const { connect } = require('./connection');

async function createTables() {
  await createMovieTable();
  await createActorsTable();
  await createMovieActorsTable();
}

async function createMovieTable() {
  try {
    const connection = await connect();

    let sql = 'CREATE TABLE IF NOT EXISTS movies(';
    sql += 'id INT(3) PRIMARY KEY, ';
    sql += 'title VARCHAR(255) NOT NULL, ';
    sql += 'synopsis TEXT NOT NUll, ';
    sql += 'created_at DATETIME DEFAULT CURRENT_TIMESTAMP, ';
    sql += 'updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP';
    sql += ')';

    await connection.execute(sql);
  } catch (err) {
    console.error(err);
  }
}

async function createActorsTable() {
  try {
    const connection = await connect();

    let sql = 'CREATE TABLE IF NOT EXISTS actors(';
    sql += 'id INT(3) PRIMARY KEY,';
    sql += 'name VARCHAR(255) NOT NULL, ';
    sql += 'birth_date DATE NOT NULL, ';
    sql += 'created_at DATETIME DEFAULT CURRENT_TIMESTAMP, ';
    sql += 'updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP';
    sql += ')';

    await connection.execute(sql);
  } catch (err) {
    console.error(err);
  }
}

async function createMovieActorsTable() {
  try {
    const connection = await connect();

    let sql = 'CREATE TABLE IF NOT EXISTS movies_actors(';
    sql += 'movie_id INT(3), ';
    sql += 'actor_id INT(3), ';
    sql += 'created_at DATETIME DEFAULT CURRENT_TIMESTAMP, ';
    sql += 'updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP, ';
    sql += 'PRIMARY KEY (movie_id, actor_id), ';
    sql += 'FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE, ';
    sql += 'FOREIGN KEY (actor_id) REFERENCES actors(id) ON DELETE CASCADE';
    sql += ')';

    await connection.execute(sql);
  } catch (err) {
    console.error(err);
  }
}

module.exports = createTables;
