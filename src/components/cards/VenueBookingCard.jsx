import { Typography, Box, styled } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { altImage } from '../../constants/variables';

const VenueBookingCardStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
  height: 'clamp(200px, 25vh, 300px)',
  borderRadius: theme.spacing(0.5),
  overflow: 'hidden',

  '&:hover': {
    '& img': {
      filter: 'brightness(0.8)',
    },
  },
}));

const TextStyle = styled(Typography)(({ theme, ...props }) => ({
  position: 'absolute',
  top: props.top ? props.top : 'auto',
  bottom: props.bottom ? props.bottom : 'auto',
  right: props.right ? props.right : 'auto',
  padding: props.padding ? props.padding : theme.spacing(0.5),
  width: '100%' || props.width,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
  zIndex: 99,
}));

export default function VenueBookingCard({ bookings }) {
  const formatDate = (date) => {
    let formatDate = new Date(date).toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return formatDate;
  };

  return (
    <LinkWrapper to={`/venue/${bookings.venue.id}`}>
      <VenueBookingCardStyle>
        <TextStyle textAlign={'center'} top={'0'} level='body1'>
          From: {formatDate(bookings.dateFrom)} - To:{' '}
          {formatDate(bookings.dateTo)}
        </TextStyle>
        <Box
          component={'img'}
          src={
            bookings.venue && bookings.venue.media[0]
              ? bookings.venue.media[0]
              : altImage
          }
          alt={bookings.venue.name}
          onError={(e) => (e.target.src = altImage)}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        <TextStyle bottom={'0'} textAlign={'center'} level='body1'>
          {bookings.venue.location.address || 'Unknown'},{' '}
          {bookings.venue.location.city}, {bookings.venue.location.country}
        </TextStyle>
        <Typography
          level='body1'
          component={'p'}
          sx={{
            position: 'absolute',
            right: 10,
            top: 40,
            backgroundColor: 'rgba(255,255,255,1)',
            color: 'black',
            padding: '0.1rem .6rem',
            borderRadius: '0.2rem',
          }}>
          Guests: {bookings.guests}
        </Typography>
      </VenueBookingCardStyle>
    </LinkWrapper>
  );
}
