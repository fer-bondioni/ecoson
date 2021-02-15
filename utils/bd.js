const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_NAME,
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    pool: { min: 1, max: 10 },
  },
});

module.exports = knex;
