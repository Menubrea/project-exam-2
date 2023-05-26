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
  width: '100%',
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
        return true;
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
            sx={{ borderRadius: 4 }}
            onChange={handleInput}
            size='sm'
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
      </Box>

      <VenueContainer>
        {filteredVenues.length > 0 ? (
          filteredVenues.map((singleVenue, i) => (
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
