// backend/models/Pokemon.js
const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
  name: { type: String },
  image: { type: String },
  wisdom: { type: String },
  hatchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
