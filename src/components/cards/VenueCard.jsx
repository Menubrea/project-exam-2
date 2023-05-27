import { Box, Typography, styled } from '@mui/joy';
import { VenueMeta, VenuePrice } from '../venueData';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { altImage } from '../../constants/variables';

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'amatic-sc, sans-serif',
  fontWeight: 700,
  padding: theme.spacing(0.5, 2, 1),
  width: '100%',
  textAlign: 'left',
  position: 'absolute',
  borderTop: `1px solid ${theme.palette.common.white}`,
  borderBottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: 0,
  background: `linear-gradient(-90deg, ${theme.palette.primary[500]} 0%, ${theme.palette.primary[700]} 100%)`,
  color: theme.palette.common.white,
}));

const StyledCard = styled(Box)(({ theme }) => ({
  flexBasis: `calc(33.333% - 1em)`,
  minWidth: 260,
  flexGrow: 1,
  height: 390,
  position: 'relative',
  boxShadow: '0 0 10px 5px rgba(0,0,0,0.1)',
  borderRadius: 5,
  overflow: 'hidden',
  cursor: 'pointer',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 5,
  },

  ':hover': {
    '& img': {
      filter: 'brightness(.8)',
    },
  },
}));

/**
 * Primary Card for displaying a venue in the venue list
 * @param {object} venue - venue object
 * @returns {JSX.Element}
 */
export default function VenueCard({ venue }) {
  return (
    <StyledCard>
      <LinkWrapper to={`/venue/${venue.id}`}>
        <Box
          component={'img'}
          loading='lazy'
          src={venue && venue.media[0] ? venue.media[0] : altImage}
          alt={`${venue.name} media`}
          onError={(e) => (e.target.src = altImage)}
        />
        <VenuePrice venue={venue} />
        <StyledTitle level='h4' component='h3'>
          {venue.name}
        </StyledTitle>
        <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />
      </LinkWrapper>
    </StyledCard>
  );
}
