// server.js
const express = require('express');
const cors = require('cors');
const { createPool } = require('@vercel/postgres');

const app = express();
const port = 3000;

app.use(cors());

const pool = createPool({
    // Replace with your PostgreSQL connection string
    connectionString: 'postgres://default:DAE7NCBvhP9V@ep-rough-unit-92773982-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb',
});

app.get('/students', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM students');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});