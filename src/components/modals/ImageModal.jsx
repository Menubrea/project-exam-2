import {
  IconButton,
  Modal,
  ModalClose,
  Box,
  ModalDialog,
  Typography,
  styled,
} from '@mui/joy';
import { useState } from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const StyledModal = styled(ModalDialog)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.neutral[50],
  padding: theme.spacing(2),

  p: {
    color: theme.palette.primary[700],
  },
}));

export default function ImageModal({ venue, open, handleClose }) {
  const [count, setCount] = useState(0);

  if (!venue) return null; // If no venue, return null.

  const handleNext = () => {
    setCount((prevCount) => prevCount + 1);
    count === venue.media.length - 1 && setCount(0);
    return count;
  };

  const handlePrev = () => {
    setCount((prevCount) => prevCount - 1);
    count === 0 && setCount(venue.media.length - 1);
    return count;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModal
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        size='md'>
        <ModalClose
          variant='solid'
          color='primary'
          onClick={handleClose}
          sx={{
            top: -15,
            right: -15,
            borderRadius: '100%',
            border: '1px solid #fff',
          }}
        />
        <Box sx={{ position: 'relative' }}>
          {venue.media.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '50%',
                transform: 'translateY(50%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <IconButton
                variant='solid'
                color='primary'
                sx={{ border: '1px solid white', left: '1rem' }}
                aria-label='Previous Image'
                onClick={handlePrev}>
                <SkipPreviousIcon sx={{ color: 'white' }} />
              </IconButton>
              <IconButton
                variant='solid'
                color='primary'
                sx={{ border: '1px solid white', right: '1rem' }}
                aria-label='Next Image'
                onClick={handleNext}>
                <SkipNextIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          )}

          <Box
            id='modal-description'
            component={'img'}
            sx={{
              width: '80vw',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '.2rem',
            }}
            onClick={handleNext}
            src={venue.media[count]}
            alt={`${venue.name} media`}
          />
          <Typography
            id='modal-title'
            level='body1'
            component={'p'}
            textAlign={'center'}>
            {count + 1} out of {venue.media.length}
          </Typography>
        </Box>
      </StyledModal>
    </Modal>
  );
}
