// frontend/src/components/PokemonTab.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress, Fade } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const PokemonDetails = lazy(() => import('./PokemonDetails'));

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const PokemonImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  margin: '0 auto',
  display: 'block',
});

const PokemonTab = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/pokemons`);
      setPokemons(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load Pokémon. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleClose = () => {
    setSelectedPokemon(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {pokemons.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center">No Pokémon hatched yet. Complete your habits to hatch Pokémon!</Typography>
          </Grid>
        ) : (
          pokemons.map((pokemon) => (
            <Grid item xs={12} sm={6} md={4} key={pokemon._id}>
              <Fade in={true} timeout={500}>
                <StyledCard onClick={() => handleClickPokemon(pokemon)}>
                  <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                      {pokemon.name}
                    </Typography>
                    <PokemonImage src={`/pokemon_images/${pokemon.image}`} alt={pokemon.name} />
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                      Hatched on: {new Date(pokemon.hatchedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          ))
        )}
      </Grid>
      <Suspense fallback={<div>Loading...</div>}>
        {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} handleClose={handleClose} />}
      </Suspense>
    </Box>
  );
};

export default PokemonTab;
