import { Typography, styled } from '@mui/material';

const CardPrice = styled(Typography)(({ theme }) => ({
  fontFamily: 'futura-pt-condensed, sans-serif',
  position: 'absolute',
  top: 10,
  right: 10,
  fontWeight: 700,
  padding: theme.spacing(1),
  width: 'fit-content',
  backdropFilter: 'blur(10px)',
  background: `${theme.palette.neutral[100]}`,
  color: theme.palette.common.black,
  borderRadius: theme.spacing(0.5),
}));

export default function VenuePrice({ venue }) {
  return (
    <CardPrice level='body1' component='p'>
      Per night: {venue.price},-
    </CardPrice>
  );
}
