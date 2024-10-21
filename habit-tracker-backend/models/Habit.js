// backend/models/Habit.js
const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: If implementing authentication
  title: { type: String, required: true },
  frequency: { type: Number, required: true }, // Times per day
  notes: { type: String },
  progress: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  pokemonBall: { type: String, required: true }, // Identifier for the Pokémon ball
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', HabitSchema);
