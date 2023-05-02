import { Box, Typography, styled } from '@mui/joy';

const StyledVenueCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
  padding: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
}));

export default function VenueEditCard({ venue }) {
  return (
    <StyledVenueCard sx={{ display: 'flex', gap: 2 }}>
      {venue && (
        <Box
          component={'img'}
          src={venue.media[0]}
          alt={venue.name}
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: '100px',
            objectFit: 'cover',
          }}
        />
      )}
      <Box>
        <Typography
          level='body1'
          component={'h3'}
          sx={{
            fontFamily: 'futura-PT-condensed',
            textTransform: 'uppercase',
          }}>
          {venue.name}
        </Typography>
        <Typography level='body1' component={'p'}>
          Current bookings: {venue.bookings.length}
        </Typography>
      </Box>
    </StyledVenueCard>
  );
}
