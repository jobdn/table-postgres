const Pool = require("pg").Pool;

// Adjust this object
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "new_db",
});

module.exports = pool;
