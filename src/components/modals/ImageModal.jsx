import { Modal, Box, ModalDialog, Typography, styled } from '@mui/joy';
import { useState } from 'react';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { MainThemeButton } from '../../styles/GlobalStyles';

import { altImage } from '../../constants/variables';

const StyledModal = styled(ModalDialog)(({ theme }) => ({
  border: 'none',
  padding: theme.spacing(2),
}));

const StyledGrid = styled(Box)(({ theme, toggle }) => ({
  position: 'relative',
  overflowY: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  height: toggle ? `calc(100% - ${theme.spacing(10)})` : '100%',

  '@media (max-width: 600px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  },
}));

/**
 * Modal component for displaying images of a venue
 * @param {object} venue - venue object
 * @param {boolean} open - boolean for opening modal
 * @param {function} handleClose - function for closing modal
 * @returns {JSX.Element}
 */
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
          <MainThemeButton
            aria-label='Change image view mode'
            size='sm'
            onClick={ToggleMediaView}>
            {toggle ? 'Slide Mode' : 'Gallery Mode'}
          </MainThemeButton>
          <MainThemeButton
            aria-label='Close image modal'
            size='sm'
            onClick={handleClose}>
            Close
          </MainThemeButton>
        </Box>
        {!toggle ? (
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
                id='modal-description'
                component={'img'}
                src={image || altImage}
                alt={`${venue.name} media`}
                onError={(e) => (e.target.src = altImage)}
                sx={{
                  height: '100%',
                  width: '100%',
                  flexBasis: 'calc(50% - 4px)',
                  flexGrow: 1,
                  objectFit: 'cover',
                  borderRadius: '.2rem',
                }}
              />
            ))}
          </StyledGrid>
        )}
      </StyledModal>
    </Modal>
  );
}
