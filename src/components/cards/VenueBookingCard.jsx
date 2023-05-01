import { Typography, Box, styled } from '@mui/joy';

const VenueBookingCardStyle = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
  height: 'clamp(200px, 25vh, 300px)',
  borderRadius: theme.spacing(0.5),
  overflow: 'hidden',
}));

const TextStyle = styled(Typography)(({ theme, ...props }) => ({
  position: 'absolute',
  top: props.top ? props.top : 'auto',
  bottom: props.bottom ? props.bottom : 'auto',
  right: props.right ? props.right : 'auto',
  padding: props.padding ? props.padding : theme.spacing(0.5),
  width: '100%',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[100],
}));

export default function VenueBookingCard({ bookings }) {
  return (
    <VenueBookingCardStyle>
      <TextStyle textAlign={'center'} top={'0'} level='body1'>
        From: {bookings.dateFrom.slice(0, 10)}
      </TextStyle>
      <Box
        component={'img'}
        src={bookings.venue.media[0]}
        alt={bookings.venue.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <TextStyle bottom={'0'} textAlign={'center'} level='body1'>
        To: {bookings.dateTo.slice(0, 10)}
      </TextStyle>
      <TextStyle level='h6' component={'p'}>
        {bookings.guests}
      </TextStyle>
    </VenueBookingCardStyle>
  );
}
