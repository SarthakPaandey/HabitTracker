// backend/routes/habits.js
const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');
const Pokemon = require('../models/Pokemon');

// Utility function to assign random Pokémon ball
const assignRandomPokemonBall = () => {
  const balls = ['PokeBall', 'GreatBall', 'UltraBall', 'MasterBall'];
  return balls[Math.floor(Math.random() * balls.length)];
};

// Utility function to get random Pokémon
const getRandomPokemon = () => {
  const pokemons = [
    { name: 'Pikachu', image: 'pikachu.png', wisdom: 'Stay positive!' },
    { name: 'Charmander', image: 'charmander.png', wisdom: 'Keep the fire burning!' },
    { name: 'Bulbasaur', image: 'bulbasaur.png', wisdom: 'Grow steadily!' },
    { name: 'Squirtle', image: 'squirtle.png', wisdom: 'Stay calm under pressure!' },
    // Add more Pokémon as desired
  ];
  return pokemons[Math.floor(Math.random() * pokemons.length)];
};

// Create a new habit
router.post('/', async (req, res) => {
  try {
    const { title, frequency, notes } = req.body;
    const pokemonBall = assignRandomPokemonBall();
    const newHabit = new Habit({ title, frequency, notes, pokemonBall });
    const savedHabit = await newHabit.save();
    res.json(savedHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single habit by ID
router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    res.json(habit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Increment habit progress
router.put('/:id/increment', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    if (habit.isCompleted) {
      return res.status(400).json({ error: 'Daily goal already completed' });
    }

    habit.progress += 1;
    if (habit.progress >= habit.frequency) {
      habit.isCompleted = true;
      // Hatch Pokémon
      const pokemonData = getRandomPokemon();
      const newPokemon = new Pokemon({ habitId: habit._id, ...pokemonData });
      await newPokemon.save();
    }
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset daily progress (handled by cron, but providing an endpoint for manual reset)
router.put('/:id/reset', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ error: 'Habit not found' });

    habit.progress = 0;
    habit.isCompleted = false;
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Pokémon associated with a habit
router.get('/:id/pokemon', async (req, res) => {
  try {
    const pokemons = await Pokemon.find({ habitId: req.params.id });
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
