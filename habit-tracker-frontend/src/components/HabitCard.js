// frontend/src/components/HabitCard.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Box, LinearProgress, Tooltip, Collapse } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import InfoModal from './InfoModal';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const PokemonBallImage = styled('img')({
  width: '60px',
  height: '60px',
  objectFit: 'contain',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const HatchingAnimation = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  margin: '0 auto',
});

const HabitCard = ({ habit, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [hatch, setHatch] = useState(false);

  useEffect(() => {
    if (habit.isCompleted && !hatch) {
      setHatch(true);
      // Optionally, trigger a sound or notification here
    }
  }, [habit.isCompleted, hatch]);

  const handleIncrement = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/habits/${habit._id}/increment`);
      onUpdate(res.data);
    } catch (err) {
      console.error(err);
      // Optionally, display an error message to the user
    }
  };

  const handleInfo = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const progressPercentage = (habit.progress / habit.frequency) * 100;

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {habit.title}
          </Typography>
          <Tooltip title="More Information" arrow>
            <IconButton onClick={handleInfo} color="secondary">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Frequency: {habit.frequency} times/day
        </Typography>
        {habit.notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Notes: {habit.notes}
          </Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={progressPercentage} />
          <Typography variant="body2" color="text.secondary" align="right">
            {habit.progress} / {habit.frequency}
          </Typography>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <PokemonBallImage src={`/pokemon_balls/${habit.pokemonBall}.png`} alt={habit.pokemonBall} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleIncrement}
            disabled={habit.isCompleted}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              paddingX: 3,
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            {habit.isCompleted ? 'Completed' : 'Increment'}
          </Button>
        </Box>
        <Collapse in={hatch}>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <HatchingAnimation src="/hatching_animation.gif" alt="Hatching Animation" />
            <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
              A Pokémon has hatched!
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
      <InfoModal open={open} handleClose={handleClose} habit={habit} />
    </StyledCard>
  );
};

export default HabitCard;
