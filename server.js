const express = require('express');
const bodyParser = require('body-parser');
const jokebookRoutes = require('./routes/jokebookRoutes');
const db = require('./db/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/jokebook', jokebookRoutes);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});