const jokebookModel = require('../models/jokebookModel');

// Get categories
const getCategories = async (req, res) => {
  try {
    const categories = await jokebookModel.getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get jokes by category (no limit)
const getJokesByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const jokes = await jokebookModel.getJokesByCategory(category);
    if (jokes.length === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.json(jokes);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get random joke
const getRandomJoke = async (req, res) => {
  try {
    const joke = await jokebookModel.getRandomJoke();
    res.json(joke);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new joke
const addJoke = async (req, res) => {
  const { category, setup, delivery } = req.body;

  if (!category || !setup || !delivery) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const joke = await jokebookModel.addJoke(category, setup, delivery);
    res.status(201).json(joke);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke,
};