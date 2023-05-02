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
  // Sort venue bookings by date
  const sortedBookings = venue.bookings.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const formatDate = (date) => {
    let formatDate = new Date(date).toLocaleDateString('en-UK', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    });
    return formatDate;
  };

  if (venue.bookings.length > 0) {
    console.log(sortedBookings[0].id);
  }

  return (
    <StyledVenueCard sx={{ display: 'flex', gap: 1 }}>
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
      <Box sx={{ width: '100%' }}>
        <Typography
          level='h6'
          component={'h3'}
          sx={{
            fontFamily: 'futura-PT-condensed',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
          {venue.name}
        </Typography>
        <Typography level='body1' component={'p'}>
          Upcoming booking(s): {venue.bookings.length}
        </Typography>
        {venue.bookings.length > 0 && (
          <Typography
            component={'p'}
            sx={{
              fontFamily: 'futura-PT-condensed',
              textTransform: 'uppercase',
              fontSize: '.9rem',
              backgroundColor: 'rgba(0,0,0,.1)',
              padding: 0.1,
              paddingX: 2,
              textAlign: 'center',
              borderRadius: 3,
            }}>
            {formatDate(sortedBookings[0].dateFrom)} -{' '}
            {formatDate(sortedBookings[0].dateTo)}, guest(s):{' '}
            {sortedBookings[0].guests}
          </Typography>
        )}
      </Box>
    </StyledVenueCard>
  );
}
