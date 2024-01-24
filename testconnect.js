const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: "postgres://default:DAE7NCBvhP9V@ep-rough-unit-92773982-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})

pool.connect();

pool.query('SELECT * FROM students', (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  pool.end(); // Corrected to pool.end()
});