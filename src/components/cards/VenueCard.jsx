import { Box, Typography, styled } from '@mui/joy';
import { VenueMeta } from '../venueData';
import { LinkWrapper } from '../../styles/GlobalStyles';

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'futura-pt-condensed, sans-serif',
  textTransform: 'uppercase',
  fontWeight: 700,
  padding: theme.spacing(1),
  width: '100%',
  backdropFilter: 'blur(10px)',
  borderTop:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,

  textAlign: 'right',
  position: 'absolute',
  bottom: 0,
  background:
    theme.palette.mode === 'dark'
      ? ` ${theme.palette.primary[700]}`
      : `${theme.palette.neutral[100]}`,
}));

const StyledCard = styled(Box)(({ theme }) => ({
  height: 350,
  position: 'relative',
  boxShadow: '0 0 10px 1px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  cursor: 'pointer',
  ':hover': {
    outline:
      theme.palette.mode === 'dark'
        ? `1px solid ${theme.palette.common.white}`
        : `1px solid ${theme.palette.primary[700]}`,
  },
}));

const CardPrice = styled(Typography)(({ theme }) => ({
  fontFamily: 'futura-pt-condensed, sans-serif',
  position: 'absolute',
  top: 10,
  right: 10,
  fontWeight: 700,
  padding: theme.spacing(1),
  width: 'fit-content',
  backdropFilter: 'blur(10px)',
  background:
    theme.palette.mode === 'dark'
      ? ` ${theme.palette.primary[900]}`
      : `${theme.palette.neutral[100]}`,
}));

const altImage =
  'https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80';

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
          }}
          src={venue.media ? venue.media[0] : altImage}
          onError={(e) => (e.target.src = altImage)}
        />
        <CardPrice level='body1' component='p'>
          {venue.price},-
        </CardPrice>
        <StyledTitle level='body1' component='h2'>
          {venue.name}
        </StyledTitle>
        <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />
      </LinkWrapper>
    </StyledCard>
  );
}
