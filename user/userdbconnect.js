const pg = require("pg");

const userdbConnect = () => {
  const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "users",
    password: process.env.POSTGER_PASSWORD,
    port: 5433,
  });

  db.connect();
  return db;
};

module.exports = userdbConnect;
