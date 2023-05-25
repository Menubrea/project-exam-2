import { Box, Typography, styled } from '@mui/joy';
import { useState, useEffect } from 'react';
import { altImage } from '../../constants/variables';

const StyledVenueCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[100],

  padding: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  position: 'relative',
  flexGrow: 1,
  flexBasis: 'calc(50% - 16px)',
  minWidth: '280px',
  maxHeight: '80px',

  '&:hover': {
    cursor: 'pointer',
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(-125deg, ${theme.palette.primary[500]} 0%, ${theme.palette.primary[800]} 100%)`
        : `linear-gradient(-125deg, ${theme.palette.neutral[50]} 0%, ${theme.palette.neutral[500]} 100%)`,
  },
}));

export default function VenueEditCard({ venue, handleBookingsSlideIn }) {
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    if (venue && venue.bookings) {
      const filtered = venue.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateFrom);
        const date = new Date();
        return bookingDate >= date;
      });

      filtered.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      setFilteredBookings(filtered);
    }
  }, [venue]);

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
          src={venue && venue.media[0] ? venue.media[0] : altImage}
          alt={venue.name}
          onError={(e) => (e.target.src = altImage)}
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
            fontWeight: 700,
            lineHeight: 1,
          }}>
          {venue.name.length > 25
            ? venue.name.slice(0, 25) + '...'
            : venue.name}
        </Typography>
        {venue && filteredBookings.length > 0 && (
          <Typography level='body1' component={'p'}>
            Upcoming booking(s): {filteredBookings.length}
          </Typography>
        )}
        {filteredBookings.length > 0 && (
          <Typography
            component={'p'}
            sx={{
              fontFamily: 'source-sans-pro, sans-serif',
              textTransform: 'uppercase',
              fontSize: '.9rem',
              backgroundColor: 'rgba(0,0,0,.05)',
              padding: 0.1,
              textAlign: 'center',
              borderRadius: 3,
            }}>
            {formatDate(filteredBookings[0].dateFrom)} -{' '}
            {formatDate(filteredBookings[0].dateTo)}
          </Typography>
        )}
      </Box>
    </StyledVenueCard>
  );
}
