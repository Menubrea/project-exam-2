import { Box, Typography, styled } from '@mui/joy';

const LocationContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[200],
  borderRadius: '.2rem',
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'space-evenly',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export default function LocationMeta({ location }) {
  return (
    <LocationContainer>
      <Typography level='body1'>Address: {location.address}</Typography>
      <Typography level='body1'>City: {location.city}</Typography>
      <Typography level='body1'>Country: {location.country}</Typography>
      <Typography level='body1'>Continent: {location.continent}</Typography>
    </LocationContainer>
  );
}
