// frontend/src/components/AddHabitForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
}));

const AddHabitForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/habits`, { title, frequency, notes });
      onAdd(res.data);
      setTitle('');
      setFrequency(1);
      setNotes('');
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to add habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPaper>
      <Typography variant="h6" gutterBottom>
        Add New Habit
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Habit Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Frequency (per day)"
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
              fullWidth
              variant="outlined"
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Additional Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Habit'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Habit added successfully!
        </Alert>
      </Snackbar>
    </FormPaper>
  );
};

export default AddHabitForm;
