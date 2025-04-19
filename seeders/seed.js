const db = require('../db/database');

const categories = ['funnyJoke', 'lameJoke'];

const funnyJokeList = [
  { setup: 'Why did the student eat his homework?', delivery: 'Because the teacher told him it was a piece of cake!' },
  { setup: 'What kind of tree fits in your hand?', delivery: 'A palm tree' },
  { setup: 'What is worse than raining cats and dogs?', delivery: 'Hailing taxis' },
];

const lameJokeList = [
  { setup: 'Which bear is the most condescending?', delivery: 'Pan-DUH' },
  { setup: 'What would the Terminator be called in his retirement?', delivery: 'The Exterminator' },
];

// Map categories to their corresponding joke lists
const jokesByCategory = {
  funnyJoke: funnyJokeList,
  lameJoke: lameJokeList
};

// Seed jokes and categories into the database
const seedDatabase = () => {
  db.serialize(() => {
    // Drop and recreate categories table
    db.run('DROP TABLE IF EXISTS categories');
    db.run('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)');

    const insertCategory = db.prepare('INSERT INTO categories (name) VALUES (?)');
    categories.forEach((category) => {
      insertCategory.run(category);
    });
    insertCategory.finalize();

    // Drop and recreate jokes table
    db.run('DROP TABLE IF EXISTS jokes');
    db.run('CREATE TABLE IF NOT EXISTS jokes (id INTEGER PRIMARY KEY, category TEXT, setup TEXT, delivery TEXT)');

    const insertJoke = db.prepare('INSERT INTO jokes (category, setup, delivery) VALUES (?, ?, ?)');
    categories.forEach((category) => {
      jokesByCategory[category].forEach((joke) => {
        insertJoke.run(category, joke.setup, joke.delivery);
      });
    });
    insertJoke.finalize();
  });
};

// Run the seed function
seedDatabase();