import { Typography, styled } from '@mui/material';

const CardPrice = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  padding: theme.spacing(0.2, 1),
  width: 'fit-content',
  backdropFilter: 'blur(10px)',
  background: `${theme.palette.neutral[100]}`,
  color: theme.palette.common.black,
  borderRadius: theme.spacing(0.2),
  fontSize: '0.95rem',
  fontWeight: 500,
}));

/**
 * Component for displaying the venue price.
 * @param {Object} venue - venue object
 * @returns {JSX.Element} VenuePrice component
 */
export default function VenuePrice({ venue }) {
  return (
    <CardPrice aria-label='Price per night' component={'p'}>
      {venue.price},- / night
    </CardPrice>
  );
}
