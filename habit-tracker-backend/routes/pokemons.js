// backend/routes/pokemons.js
const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

// Get all hatched Pokémon
router.get('/', async (req, res) => {
  try {
    const pokemons = await Pokemon.find().sort({ hatchedAt: -1 });
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single Pokémon by ID
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) return res.status(404).json({ error: 'Pokémon not found' });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
