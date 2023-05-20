import { Box, Typography, styled, Container } from '@mui/joy';
import { VenueMeta } from '../venueData';
import { MainThemeButton, LinkWrapper } from '../../styles/GlobalStyles';
import { altImage } from '../../constants/variables';

const HeroContainer = styled(Box)(({ theme }) => ({
  height: 'min(80vh, 1000px)',
  position: 'relative',
  overflow: 'hidden',
  top: 0,

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

const HeroBody = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(0,0,0, 0.1)'
      : 'rgba(255,255,255, 0.1)',

  width: '100%',
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  display: 'flex',
  left: '50%',
  transform: 'translateX(-50%)',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export default function HeroCard({ venue }) {
  return (
    <HeroContainer>
      <Box
        component={'img'}
        src={venue.media && venue.media[0] ? venue.media[0] : altImage}
        alt={venue && venue.name + ' media'}
        onError={(e) => (e.target.src = altImage)}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
      />
      <HeroBody>
        <Container sx={{ display: 'flex' }}>
          <Box sx={{ paddingY: 2, width: '100%' }}>
            <Typography
              level='h5'
              component='p'
              sx={{
                textTransform: 'Uppercase',
                fontWeight: 900,
                lineHeight: 0.6,
                marginBottom: 0,
              }}>
              This week's featured venue
            </Typography>
            <Box
              sx={{
                display: { xs: 'block', sm: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Typography
                level='h1'
                component={'h1'}
                sx={{
                  fontFamily: 'amatic-sc, sans-serif',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(2.8rem, 5vw, 3.8rem)',
                  marginBottom: 1,
                  lineHeight: 1,
                }}>
                {venue.name}
              </Typography>
              <Box sx={{ margin: { xs: '0 0 0 auto' }, width: 'fit-content' }}>
                <LinkWrapper to={`/venue/${venue.id}`}>
                  {' '}
                  <MainThemeButton size='sm'>Read More</MainThemeButton>
                </LinkWrapper>
              </Box>
            </Box>

            <Typography
              level='h6'
              component={'p'}
              sx={{ overflow: 'hidden', display: { xs: 'none', md: 'block' } }}>
              {venue.description.slice(0, 450).concat('...')}
            </Typography>
          </Box>
        </Container>
      </HeroBody>
    </HeroContainer>
  );
}
