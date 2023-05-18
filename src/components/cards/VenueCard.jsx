import { Box, Typography, styled } from '@mui/joy';
import { VenueMeta, VenuePrice } from '../venueData';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { altImage } from '../../constants/variables';

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'amatic-sc, sans-serif',
  fontWeight: 700,
  padding: theme.spacing(0.5, 2.5),
  width: 'fit-content',
  textAlign: 'left',
  position: 'absolute',
  border: `1px solid ${theme.palette.common.white}`,
  bottom: 0,
  borderRadius: '3px 1em 3px 3px',
  background: `linear-gradient(-90deg, ${theme.palette.primary[500]} 0%, ${theme.palette.primary[700]} 100%)`,
  color: theme.palette.common.white,
}));

const StyledCard = styled(Box)(({ theme }) => ({
  height: 390,
  position: 'relative',
  boxShadow: '0 0 10px 5px rgba(0,0,0,0.1)',
  borderRadius: 5,
  cursor: 'pointer',
  ':hover': {
    '& img': {
      filter: 'brightness(.8)',
    },
  },
}));

export default function VenueCard({ venue }) {
  return (
    <StyledCard>
      <LinkWrapper to={`/venue/${venue.id}`}>
        <Box
          component={'img'}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 5,
          }}
          src={venue && venue.media[0] ? venue.media[0] : altImage}
          alt={`${venue.name} media`}
          onError={(e) => (e.target.src = altImage)}
        />
        <VenuePrice venue={venue} />
        <StyledTitle level='h5' component='h2'>
          {venue.name}
        </StyledTitle>
        <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />
      </LinkWrapper>
    </StyledCard>
  );
}
