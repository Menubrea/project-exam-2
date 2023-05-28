import { Box, Typography, styled } from '@mui/joy';

const LocationContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
  margin: theme.spacing(1, 0),
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  borderBlock:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.primary[400]}`
      : `1px solid ${theme.palette.neutral[400]}`,
}));

/**
 * Component for displaying the location meta data.
 * @param {Object} location - location object
 * @returns {JSX.Element} LocationMeta component
 */
export default function LocationMeta({ location }) {
  return (
    <LocationContainer>
      <Typography sx={{ fontSize: '0.8rem' }}>{location.address}, </Typography>
      <Typography level='body1' sx={{ fontSize: '0.8rem' }}>
        {location.city},
      </Typography>
      <Typography level='body1' sx={{ fontSize: '0.8rem' }}>
        {location.country}
      </Typography>
    </LocationContainer>
  );
}
