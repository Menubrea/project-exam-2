import { Box, Typography, styled } from '@mui/material';
import { VenueEditCard } from '../cards';
import { MainThemeInput, MainThemeButton } from '../../styles/GlobalStyles';
import { useEffect, useState, useRef } from 'react';

const VenueContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexWrap: 'wrap',

  gap: theme.spacing(1),
}));

const VenueWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  width: '100%',

  '@media (max-width: 600px)': {
    marginTop: theme.spacing(2),
  },
}));

export default function ProfileVenueList({ venues, handleBookingsSlideIn }) {
  const [input, setInput] = useState('');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const inputRef = useRef();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    const input = document.querySelector('#searchYourVenues');
    input.value = '';
    input.focus();
    setInput('');
  };

  useEffect(() => {
    setInput('');
    setFilteredVenues(venues);
  }, []);

  useEffect(() => {
    const searchedVenues = venues.filter((venue) => {
      if (venue.name.toLowerCase().includes(input.toLowerCase())) {
        return venue;
      }
      return false;
    });
    setFilteredVenues(searchedVenues);
  }, [input, venues]);

  return (
    <VenueWrapper component={'section'}>
      <Box
        sx={{
          display: { xs: 'block', sm: 'flex' },
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          gap: 2,
          position: 'relative',
        }}>
        <Typography
          sx={{
            height: 'fit-content',
          }}
          component={'h2'}>
          You have {venues.length} venue(s)
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MainThemeInput
            sx={{ borderRadius: 4, touchAction: 'none' }}
            onChange={handleInput}
            size='md'
            ref={inputRef}
            aria-label='Search your venues'
            id={'searchYourVenues'}
            type={'text'}
            placeholder={'Search your venues'}
          />
          {input.length > 0 && (
            <MainThemeButton size='sm' onClick={clearInput}>
              Clear
            </MainThemeButton>
          )}
        </Box>
        {input.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 65, sm: 40 },
              right: { xs: 'auto', md: '0' },
              left: { xs: '0', md: 'auto' },
              boxShadow: '0 0 10px 1px rgba(0, 0, 0, .2)',

              width: { xs: '100%', md: 'calc(50% - 4px)' },
              zIndex: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[700]
                  : theme.palette.neutral[50],
            }}>
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <Typography
                  tabIndex={0}
                  aria-label={`Your venue ${venue.name}`}
                  id={venue.id}
                  on
                  onClick={handleBookingsSlideIn}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleBookingsSlideIn(e);
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                    padding: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                  }}
                  key={venue.id}>
                  {venue.name}
                </Typography>
              ))
            ) : (
              <Typography sx={{ padding: 1 }}>No venues found</Typography>
            )}
          </Box>
        )}
      </Box>

      <VenueContainer>
        {venues.length > 0 ? (
          venues.map((singleVenue, i) => (
            <VenueEditCard
              key={i}
              venue={singleVenue}
              handleBookingsSlideIn={handleBookingsSlideIn}
            />
          ))
        ) : (
          <Typography>No venues found</Typography>
        )}
      </VenueContainer>
    </VenueWrapper>
  );
}
