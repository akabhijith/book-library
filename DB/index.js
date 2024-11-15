import pg from "pg";

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432,
});

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
