// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Tabs, Tab, Box, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import AddHabitForm from './components/AddHabitForm';
import HabitCard from './components/HabitCard';
import PokemonTab from './components/PokemonTab';
import { styled } from '@mui/system';

const Header = styled(AppBar)({
  borderRadius: 0,
  marginBottom: '20px',
});

function App() {
  const [habits, setHabits] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/habits`);
      setHabits(res.data);
    } catch (err) {
      console.error(err);
      // Optionally, implement error handling
    }
  };

  const handleAddHabit = (newHabit) => {
    setHabits([newHabit, ...habits]);
  };

  const handleUpdateHabit = (updatedHabit) => {
    setHabits(habits.map(habit => habit._id === updatedHabit._id ? updatedHabit : habit));
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Header position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Pokémon Habit Tracker
          </Typography>
        </Toolbar>
      </Header>
      <Container>
        <Tabs value={tab} onChange={handleChangeTab} centered indicatorColor="primary" textColor="primary">
          <Tab label="Habits" />
          <Tab label="Pokémon" />
        </Tabs>
        <Box hidden={tab !== 0} sx={{ mt: 2 }}>
          <AddHabitForm onAdd={handleAddHabit} />
          {habits.length === 0 ? (
            <Typography align="center" sx={{ mt: 4 }}>
              No habits added yet. Start by adding a new habit!
            </Typography>
          ) : (
            habits.map(habit => (
              <HabitCard key={habit._id} habit={habit} onUpdate={handleUpdateHabit} />
            ))
          )}
        </Box>
        <Box hidden={tab !== 1} sx={{ mt: 2 }}>
          <PokemonTab />
        </Box>
      </Container>
    </>
  );
}

export default App;
