const express = require('express');
const router = express.Router();
const jokebookController = require('../controllers/jokebookController');

// http://localhost:3000/jokebook/categories
router.get('/categories', jokebookController.getCategories);

// http://localhost:3000/jokebook/joke/funnyJoke
router.get('/joke/:category', jokebookController.getJokesByCategory);

// http://localhost:3000/jokebook/random
router.get('/random', jokebookController.getRandomJoke);

// http://localhost:3000/jokebook/joke/add
router.post('/joke/add', jokebookController.addJoke);

module.exports = router;