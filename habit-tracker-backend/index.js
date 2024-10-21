// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const Habit = require('./models/Habit');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const habitRoutes = require('./routes/habits');
const pokemonRoutes = require('./routes/pokemons');
app.use('/api/habits', habitRoutes);
app.use('/api/pokemons', pokemonRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));

// Cron job to reset habits daily at midnight
cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
  try {
    await Habit.updateMany({}, { progress: 0, isCompleted: false });
    console.log('Daily habit progress reset.');
  } catch (err) {
    console.log('Error resetting habits:', err);
  }
});
