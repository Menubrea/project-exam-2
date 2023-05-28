import { Box, Typography, styled, Container } from '@mui/joy';
import { LinkWrapper } from '../../styles/GlobalStyles';
import { altImage } from '../../constants/variables';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { AltMeta } from '../venueData';
import { keyframes } from '@emotion/react';

const HeroContainer = styled(Box)(() => ({
  height: 'min(calc(85vh + 50px), 1000px)',
  position: 'relative',
  overflow: 'hidden',
  top: 0,
  zIndex: 0,
}));

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroBody = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: theme.spacing(2),
  zIndex: 1,
  animation: `${slideIn} .5s ease-in-out`,

  ':before': {
    content: '""',
    zIndex: -1,
    position: 'absolute',
    left: 0,
    width: '120vw',
    height: '170%',
    bottom: 80,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[500]
        : theme.palette.neutral[100],
    clipPath: 'polygon(0% 53%, 100% 76%, 100% 100%, 0% 99%)',
  },

  ':hover': {
    cursor: 'pointer',
    '& h2': {
      textDecoration: '3px solid underline',
    },
  },

  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ImageContainer = styled(Box)(({}) => ({
  '--speed': '.6s',
  width: '100%',
  height: 'calc(100% - 100px)',
  position: 'absolute',
  display: 'flex',
  gap: '8px',

  '& img': {
    opacity: 0,
    ':nth-of-type(1)': {
      animation: `${fadeIn} var(--speed) ease-in-out`,
      animationFillMode: 'forwards',
    },
    ':nth-of-type(2)': {
      animation: `${fadeIn} var(--speed) ease-in-out`,
      animationDelay: '.2s',
      animationFillMode: 'forwards',
    },
  },

  '@media (prefers-reduced-motion: reduce)': {
    '& img': {
      opacity: 1,
      animation: 'none',
    },
  },
}));

/**
 * JSX Component for Hero Section card
 * @param { object } venue - venue object
 * @returns JSX Element for HeroCard
 */
export default function HeroCard({ venue }) {
  const [description, setDescription] = useState(venue.description);
  const [count, setCount] = useState(0);
  const [imageCount, setImageCount] = useState(0);

  const handleResize = debounce(() => {
    if (window.innerWidth < 800) {
      setImageCount(1);
    } else {
      setImageCount(2);
    }
    setCount(window.innerWidth / 3);
  }, 100);

  const slicedImages =
    venue.media.length > 0 && venue.media.slice(0, imageCount);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (venue.description && count > 0) {
      setDescription(venue.description.slice(0, count).concat('...'));
    }
  }, [count, venue.description]);

  return (
    <HeroContainer>
      <ImageContainer>
        {slicedImages.map((image, i) => {
          return (
            <Box
              key={i}
              component={'img'}
              src={venue.media && image ? image : altImage}
              alt={venue && venue.name + ' media'}
              onError={(e) => (e.target.src = altImage)}
              sx={{
                flexBasis: `calc(100% / ${imageCount} - (8px * ${imageCount})))`,
                height: '100%',
                width: '100%',
                flex: 1,
                objectFit: 'cover',
              }}
            />
          );
        })}
      </ImageContainer>
      <HeroBody>
        <Container sx={{ display: 'flex' }}>
          <LinkWrapper to={`/venue/${venue.id}`}>
            <Box sx={{ paddingTop: 2, width: '100%' }}>
              <Box>
                <AltMeta venue={venue} />
                <Typography
                  level='h6'
                  component='h1'
                  sx={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                    textTransform: 'Uppercase',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginTop: 1,
                  }}>
                  Latest addition
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'block', sm: 'flex' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Typography
                  level='h1'
                  component={'h2'}
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
              </Box>

              <Typography
                level='h6'
                component={'p'}
                sx={{
                  overflow: 'hidden',
                  fontSize: { xs: '.9rem', sm: '1.1rem' },
                }}>
                {description}
              </Typography>
              <Box
                sx={{
                  margin: { xs: '.5rem auto', sm: '0 0 0 auto' },
                  width: 'fit-content',
                }}></Box>
            </Box>
          </LinkWrapper>
        </Container>
      </HeroBody>
    </HeroContainer>
  );
}
