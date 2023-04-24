import { Box, Typography, styled } from '@mui/joy';
import VenueMeta from '../VenueMeta';
import { LinkWrapper } from '../../styles/GlobalStyles';

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'amatic-sc',
  padding: theme.spacing(1),
  textAlign: 'center',
  width: '100%',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[50],
  borderTop:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[700]}`,
}));

const StyledCard = styled(Box)(({ theme }) => ({
  height: 390,
  borderRadius: 10,
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
            borderRadius: 10,
          }}
          src={venue.media ? venue.media[0] : altImage}
          onError={(e) => (e.target.src = altImage)}
        />
        <StyledTitle
          level='h5'
          component='h2'
          sx={{
            position: 'absolute',
            bottom: 0,
          }}>
          {venue.name}
        </StyledTitle>
        <VenueMeta meta={venue.meta} maxGuests={venue.maxGuests} />
      </LinkWrapper>
    </StyledCard>
  );
}
