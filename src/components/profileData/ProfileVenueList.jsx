import { Box, Typography, styled } from '@mui/material';
import { VenueEditCard } from '../cards';
import { MainThemeInput } from '../../styles/GlobalStyles';
import { useEffect, useState } from 'react';

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

  const handleInput = (e) => {
    setInput(e.target.value);
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
          display: 'flex',
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
        <MainThemeInput
          sx={{ borderRadius: 4 }}
          onChange={handleInput}
          size='sm'
          type={'search'}
          placeholder={'Search your venues'}
        />
        <Box
          sx={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[700]
                : theme.palette.neutral[50],
            cursor: 'pointer',
            boxShadow: '0 0 10px 1px rgba(0,0 ,0, 0.1)',
            top: 40,
            right: 0,
            width: '50%',
          }}>
          {input.length > 0 &&
            filteredVenues.map((venue) => {
              return (
                <Box
                  id={venue.id}
                  onClick={handleBookingsSlideIn}
                  key={venue.id}
                  sx={{
                    padding: 2,
                    ':hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)',
                    },
                  }}>
                  <Typography>{venue.name}</Typography>
                </Box>
              );
            })}
        </Box>
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
