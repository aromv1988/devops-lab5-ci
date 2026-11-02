const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Підключення до бази даних з урахуванням змінних середовища Compose
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'db',
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'appdb',
});

// Функція перевірки та підключення з затримкою/повтором
const connectWithRetry = () => {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Помилка підключення до Postgres, повторна спроба через 5 сек...', err.stack);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Успішно підключено до PostgreSQL:', res.rows[0].now);
    }
  });
};

connectWithRetry();

app.get('/', (req, res) => {
  res.send('Node.js app is running with PostgreSQL!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});