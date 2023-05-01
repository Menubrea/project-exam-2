import { Box, Typography, styled } from '@mui/joy';
import { VenueMeta } from '../venueData';
import { MainThemeButton, LinkWrapper } from '../../styles/GlobalStyles';

// Styling for Hero section container.
const HeroContainer = styled(Box)(({ theme }) => ({
  height: 'min(97vh, 1000px)',
  position: 'relative',
  overflow: 'hidden',

  ':before, :after': {
    content: '""',
    zIndex: 1,
    position: 'absolute',
    left: 0,
    width: '100%',
  },
  ':after': {
    height: 'min(40vh, 350px)',
    bottom: 0,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(0deg, ${theme.palette.primary[500]} 0%, rgba(255,255,255,0) 100%)`
        : `linear-gradient(0deg, ${theme.palette.neutral[50]} 0%, rgba(255,255,255,0) 100%)`,
  },
  bottom: '0',
}));

// Styling for hero section body.
const HeroBody = styled(Box)(({ theme }) => ({
  width: 'clamp(310px, 80%, 700px)',
  position: 'absolute',
  height: '222px',
  zIndex: 2,
  bottom: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 3,
  backdropFilter: 'blur(3px)',

  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(45deg, ${theme.palette.primary[800]} 0%, rgba(255,255,255,0) 100%)`
      : `linear-gradient(45deg, ${theme.palette.neutral[50]} 0%, rgba(255,255,255,0) 100%)`,

  border:
    theme.palette.mode === 'dark'
      ? `1px solid ${theme.palette.common.white}`
      : `1px solid ${theme.palette.primary[500]}`,
}));

export default function HeroCard({ venue }) {
  return (
    <HeroContainer>
      <Box
        component={'img'}
        src={venue.media && venue.media[0]}
        alt={venue.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <HeroBody>
        <Box sx={{ maxWidth: 700, display: 'flex' }}>
          <VenueMeta
            position='static'
            height='220px'
            borderRadius='0px'
            border='none'
            meta={venue.meta}
            maxGuests={venue.maxGuests}
          />
          <Box sx={{ padding: 2 }}>
            <Typography
              level='h6'
              component='p'
              sx={{
                fontFamily: 'futura-PT-condensed',
                textTransform: 'Uppercase',
                lineHeight: 1,
              }}>
              This week's featured venue
            </Typography>
            <Typography
              level='h3'
              component={'h2'}
              sx={{
                fontFamily: 'futura-PT-condensed',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}>
              {venue.name}
            </Typography>
            <Typography
              level='body1'
              sx={{ overflow: 'hidden', height: '130px' }}>
              {venue.description.slice(0, 450).concat('...')}
            </Typography>
          </Box>
        </Box>
        <MainThemeButton
          sx={{
            position: 'absolute',
            bottom: '-1.2em',
            left: '75%',
            transform: 'translateX(-50%)',
          }}>
          <LinkWrapper to={`/venue/${venue.id}`}>Read More</LinkWrapper>
        </MainThemeButton>
      </HeroBody>
    </HeroContainer>
  );
}
