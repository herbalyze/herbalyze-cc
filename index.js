const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

const homeRoutes = require('./routes/homeRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const plantDetailRoutes = require('./routes/plantDetailRoutes');

app.use('/api', homeRoutes);
app.use('/api', predictionRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', plantDetailRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Herbalyze API</h1>
    <p>Available endpoints</p>
    <ul>
      <li><a href="/api/plants">GET /api/plants</a></li>
      <li><a href="/api/predict">POST /api/predict</a></li>
      <li><a href="/api/plant/:id">GET /api/plant/:id</a></li>
      <li><a href="/api/favorites/:id">GET /api/favorites/:id</a></li>
      <li><a href="/api/favorites">POST /api/favorites</a></li>
      <li><a href="/api/favorites">DELETE /api/favorites</a></li>
    </ul>
  `);
});

app.use((req, res) => {
  res.status(404).send(`
    <h1>Oops, there is nothing on this path</h1>
    <p><a href="/">Click here to go back</a></p>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
