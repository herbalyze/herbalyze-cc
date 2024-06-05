require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/homeRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const plantDetailRoutes = require('./routes/plantDetailRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use('/api/home', homeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/plant', plantDetailRoutes);
app.use('/api/predict', predictionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
