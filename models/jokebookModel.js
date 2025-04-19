const db = require('../db/database');

// Get all categories
const getCategories = async () => {
  const sql = 'SELECT DISTINCT category FROM jokes';
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Get jokes by category
const getJokesByCategory = async (category) => {
  const sql = 'SELECT * FROM jokes WHERE category = ?';
  return new Promise((resolve, reject) => {
    db.all(sql, [category], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Get a random joke
const getRandomJoke = async () => {
  const sql = 'SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1';
  return new Promise((resolve, reject) => {
    db.get(sql, [], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Add a new joke
const addJoke = async (category, setup, delivery) => {
  const sql = 'INSERT INTO jokes (category, setup, delivery) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.run(sql, [category, setup, delivery], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, category, setup, delivery });
    });
  });
};

module.exports = {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke,
};