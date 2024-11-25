
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "a",
  port: 5432,
});

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "world",
//   password: "123456",
//   port: 5432,
// });
pool.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
