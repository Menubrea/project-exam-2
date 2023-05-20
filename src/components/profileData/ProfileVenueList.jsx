import { Box, Container, Typography, styled } from '@mui/material';
import { VenueEditCard } from '../cards';

const VenueContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(2),
}));

const VenueWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  width: '100%',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[300],
  borderTop:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
  borderBottom:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
}));

export default function ProfileVenueList({ venues, handleBookingsSlideIn }) {
  return (
    <VenueWrapper>
      <Container component={'section'}>
        <Typography
          sx={{ fontWeight: 900, marginBottom: 0.5 }}
          component={'h2'}>
          Manage Venues:
        </Typography>
      </Container>
      <VenueContainer>
        {venues.map((venue, i) => (
          <VenueEditCard
            key={i}
            venue={venue}
            handleBookingsSlideIn={handleBookingsSlideIn}
          />
        ))}
      </VenueContainer>
    </VenueWrapper>
  );
}
