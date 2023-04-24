import { Container, Typography, styled, Box } from '@mui/joy';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StyledMainGrid = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'repeat(6, 1fr)',
  minHeight: '100vh',
}));

const VenueDetails = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
  padding: theme.spacing(2),
}));

export default function Venue({ venue }) {
  const { id } = useParams();
  const [venueById, setVenueById] = useState(null);

  console.log(venueById);

  useEffect(() => {
    venue.filter((filteredVenue) =>
      filteredVenue.id === id ? setVenueById(filteredVenue) : null
    );
  }, [venue, id]);

  return (
    <StyledMainGrid
      maxWidth='lg'
      component={'main'}
      sx={{ padding: { xs: 0 } }}>
      <VenueDetails
        sx={{
          borderRadius: { xs: 0, sm: 0, md: '1rem 0 0 1rem' },
          gridColumn: { xs: '-1 / -1', md: '2 / 7' },
          gridRow: { xs: 'auto / auto', sm: 'auto / auto', md: '2 / 6' },
        }}>
        <Typography
          level='h6'
          component={'p'}
          sx={{
            fontFamily: 'futura-pt-condensed',
            textTransform: 'uppercase',
            lineHeight: 0,
            marginTop: 2,
          }}>
          {venueById && 'Introducing'}
        </Typography>

        <Typography level='h1' sx={{ fontFamily: 'amatic-sc' }}>
          {venueById && venueById.name}
        </Typography>
        <Typography>{venueById && venueById.description}</Typography>
      </VenueDetails>
      <Box
        sx={{
          gridColumn: { xs: '-1 / -1', md: ' 7 / 12' },
          gridRow: { xs: '1 / auto', sm: '1 / auto', md: '1 / 7' },
        }}>
        <Box
          component={'img'}
          src={venueById && venueById.media[0]}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
    </StyledMainGrid>
  );
}
