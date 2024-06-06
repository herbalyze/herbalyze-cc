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

// Routes
const homeRoutes = require('./routes/homeRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const plantDetailRoutes = require('./routes/plantDetailRoutes');

app.use('/api', homeRoutes);
app.use('/api', predictionRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', plantDetailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
