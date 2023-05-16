import { Box, Typography, styled } from '@mui/joy';
import { useState, useEffect } from 'react';

const StyledVenueCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
  padding: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  position: 'relative',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[600]
        : theme.palette.neutral[200],
  },
}));

export default function VenueEditCard({ venue, handleBookingsSlideIn }) {
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    if (venue) {
      const filtered = venue.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateFrom);
        const date = new Date();
        return bookingDate >= date;
      });

      setFilteredBookings(filtered);
    }
  }, []);

  const sortedBookings = filteredBookings.sort((a, b) => {
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

  return (
    <StyledVenueCard
      id={venue.id}
      sx={{ display: 'flex', gap: 1 }}
      onClick={handleBookingsSlideIn}>
      {venue && (
        <Box
          component={'img'}
          src={venue.media[0]}
          alt={venue.name}
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: '100px',
            maxHeight: '65px',
            objectFit: 'cover',
            borderRadius: 3,
          }}
        />
      )}
      <Box sx={{ width: '100%' }}>
        <Typography
          level='body1'
          component={'h3'}
          sx={{
            fontFamily: 'futura-pt-condensed, sans-serif',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
          {venue.name}
        </Typography>
        <Typography level='body1' component={'p'}>
          Upcoming booking(s): {venue.bookings.length}
        </Typography>
        {venue.bookings &&
          venue.bookings.length > 0 &&
          sortedBookings.length > 0 && (
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
              {formatDate(sortedBookings[0].dateTo)}
            </Typography>
          )}
      </Box>
    </StyledVenueCard>
  );
}
