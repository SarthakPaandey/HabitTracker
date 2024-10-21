// frontend/src/components/InfoModal.js
import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  padding: theme.spacing(4),
  outline: 'none',
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '10px',
  right: '10px',
});

const InfoModal = ({ open, handleClose, habit }) => {
  if (!habit) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <Typography variant="h6" gutterBottom>
          {habit.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Frequency:</strong> {habit.frequency} times/day
        </Typography>
        {habit.notes && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Notes:</strong> {habit.notes}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
          "Keep pushing towards your goals!"
        </Typography>
      </ModalBox>
    </Modal>
  );
};

export default InfoModal;
