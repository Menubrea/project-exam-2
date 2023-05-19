import {
  IconButton,
  Modal,
  Box,
  ModalDialog,
  Typography,
  styled,
} from '@mui/joy';
import { useState } from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { MainThemeButton } from '../../styles/GlobalStyles';

import { altImage } from '../../constants/variables';

const StyledModal = styled(ModalDialog)(({ theme }) => ({
  border: 'none',
  padding: theme.spacing(2),
}));

const StyledGrid = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: theme.spacing(1),
  height: `calc(100% - ${theme.spacing(10)})`,
}));

export default function ImageModal({ venue, open, handleClose }) {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  if (!venue) return null;

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

  const ToggleMediaView = () => {
    toggle ? setToggle(false) : setToggle(true);
    return toggle;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModal
        layout='fullscreen'
        aria-labelledby='modal-title'
        aria-describedby='modal-description'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: (theme) => theme.spacing(6),
          }}>
          <Typography
            id='modal-title'
            aria-label='modal-title'
            sx={{ margin: 0, padding: 0 }}
            level='h6'
            component={'p'}>
            Viewing images for {venue.name}
          </Typography>
          <MainThemeButton size='sm' onClick={handleClose}>
            Close
          </MainThemeButton>
        </Box>
        {toggle ? (
          <Box
            sx={{
              position: 'relative',
              height: (theme) => `calc(100% - ${theme.spacing(10)})`,
            }}>
            {venue.media.length > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '50%',
                  transform: 'translateY(50%)',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingX: 2,
                }}>
                <MainThemeButton
                  size='sm'
                  aria-label='Previous Image'
                  onClick={handlePrev}>
                  <SkipPreviousIcon />
                </MainThemeButton>
                <MainThemeButton
                  size='sm'
                  aria-label='Next Image'
                  onClick={handleNext}>
                  <SkipNextIcon />
                </MainThemeButton>
              </Box>
            )}
            {venue.media && (
              <Box
                id='modal-description'
                component={'img'}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: 10,
                }}
                onClick={handleNext}
                src={venue.media[count]}
                alt={`${venue.name} media`}
                onError={(e) => (e.target.src = altImage)}
              />
            )}
            <Typography
              sx={{ height: (theme) => theme.spacing(4) }}
              level='body1'
              component={'p'}
              textAlign={'center'}>
              {count + 1} out of {venue.media.length}
            </Typography>
          </Box>
        ) : (
          <StyledGrid>
            {venue.media.map((image, index) => (
              <Box
                key={index}
                component={'img'}
                src={image || altImage}
                alt={`${venue.name} media`}
                onError={(e) => (e.target.src = altImage)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '.2rem',
                }}
              />
            ))}
          </StyledGrid>
        )}
        <MainThemeButton
          sx={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          size='sm'
          onClick={ToggleMediaView}>
          {!toggle ? 'Slide Mode' : 'Gallery Mode'}
        </MainThemeButton>
      </StyledModal>
    </Modal>
  );
}
