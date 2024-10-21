// frontend/src/components/PokemonDetails.js
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { styled } from '@mui/system';

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  padding: theme.spacing(4),
  outline: 'none',
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '10px',
  right: '10px',
});

const PokemonImage = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  objectFit: 'contain',
  margin: '0 auto',
  display: 'block',
  animation: 'spin 4s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100px',
    height: '100px',
  },
}));

const PokemonDetails = ({ pokemon, handleClose }) => {
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHabit();
  }, [pokemon]);

  const fetchHabit = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/habits/${pokemon.habitId}`);
      setHabit(res.data);
    } catch (err) {
      console.error(err);
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response
        setError('Error: No response from server.');
      } else {
        // Something else happened
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={Boolean(pokemon)} onClose={handleClose}>
      <ModalBox>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              {pokemon.name}
            </Typography>
            <PokemonImage src={`/pokemon_images/${pokemon.image}`} alt={pokemon.name} />
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
              {pokemon.wisdom}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              <strong>From Habit:</strong> {habit.title}
            </Typography>
          </>
        )}
      </ModalBox>
    </Modal>
  );
};

export default PokemonDetails;
