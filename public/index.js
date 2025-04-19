fetchRandomJoke();
fetchCategories();

// Search by category
document.getElementById('category-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const input = document.getElementById('category-input');
  const category = input.value.trim();
  if (category) {
    fetchJokesByCategory(category);
  }
});

// Adding a new joke
document.getElementById('add-joke-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const category = form.category.value.trim();
  const setup = form.setup.value.trim();
  const delivery = form.delivery.value.trim();
  const messageDiv = document.getElementById('add-joke-result');
  messageDiv.textContent = '';

  if (!category || !setup || !delivery) {
    messageDiv.textContent = 'All fields are required.';
    messageDiv.style.backgroundColor = '#FFDDC1';
    return;
  }

  // POST request to add joke
  fetch('/jokebook/joke/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, setup, delivery })
  })
    .then(response => {
      return response.json().then(data => ({ status: response.ok, data }));
    })
    .then(result => {
      if (result.status) {
        messageDiv.textContent = 'Joke added!';
        messageDiv.style.backgroundColor = '#D4EDDA';
        form.reset();
        fetchJokesByCategory(category, messageDiv);
        fetchCategories();
      } else {
        messageDiv.textContent = result.data.error || 'Failed to add joke.';
        messageDiv.style.backgroundColor = '#F8D7DA';
      }
    })
    .catch(error => {
      messageDiv.textContent = 'An error occurred while adding the joke.';
      messageDiv.style.backgroundColor = '#F8D7DA';
      console.error(error);
    });
});

// Random Joke
function fetchRandomJoke() {
  fetch('/jokebook/random')
    .then(response => response.json())
    .then(joke => {
      const display = document.getElementById('joke-display');
      display.innerHTML = `<p><strong>${joke.setup}</strong><br>${joke.delivery}</p>`;
    });
}

// Get list of joke categories and display them as buttons
function fetchCategories() {
  fetch('/jokebook/categories')
    .then(response => response.json())
    .then(categories => {
      const list = document.getElementById('category-list');
      list.innerHTML = '';

      categories.forEach(item => {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = item.category;

        button.addEventListener('click', function () {
          fetchJokesByCategory(item.category);
        });

        listItem.appendChild(button);
        list.appendChild(listItem);
      });
    });
}

// Show jokes from a selected category
function fetchJokesByCategory(category, container) {
  const resultDiv = container || document.getElementById('search-results');

  fetch(`/jokebook/joke/${category}`)
    .then(response => response.json())
    .then(jokes => {
      resultDiv.innerHTML = `<h3>All Jokes in: ${category}</h3>`;
      renderJokes(jokes, resultDiv);
    })
    .catch(() => {
      resultDiv.innerHTML = '<p>Invalid category</p>';
    });
}

// Show jokes in a container
function renderJokes(jokes, container) {
  if (jokes.length === 0) {
    container.innerHTML += '<p>No jokes found.</p>';
    return;
  }

  jokes.forEach(joke => {
    const jokeDiv = document.createElement('div');
    jokeDiv.innerHTML = `<p><strong>${joke.setup}</strong><br>${joke.delivery}</p>`;
    container.appendChild(jokeDiv);
  });
}