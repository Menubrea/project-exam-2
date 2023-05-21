import { Typography, Box, styled } from '@mui/joy';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GlobeIcon from '@mui/icons-material/Public';

const StyledNavElement = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: theme.spacing(1, 1.5),
  overflow: 'hidden',

  ':before': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: 0,
    width: '100%',
    height: '5px',
    borderRadius: '100px',
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(45deg, ${theme.palette.primary[500]}, ${theme.palette.primary[600]})`
        : `linear-gradient(45deg, ${theme.palette.neutral[200]}, ${theme.palette.neutral[300]})`,
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease-in-out',
    transformOrigin: 'right',
    zIndex: '-1',
  },

  ':hover:before': {
    transform: 'scaleX(1)',
    transformOrigin: 'left',
  },

  '& p': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary[700],
    transition: 'color 0.3s ease-in-out',
  },

  '@media (max-width: 600px)': {
    padding: theme.spacing(2, 1),
    zIndex: 100,
  },
}));

export function Navigation() {
  return (
    <Box component={'nav'} sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-around', sm: 'flex-start' },
          height: '100%',
          width: '100%',
          alignItems: 'center',
          gap: 1,
        }}>
        <StyledNavElement to='/'>
          <Typography
            margin={'0 auto'}
            width={'fit-content'}
            startDecorator={<HomeIcon />}>
            Home
          </Typography>
        </StyledNavElement>

        <StyledNavElement to='/browse'>
          <Typography
            margin={'0 auto'}
            width={'fit-content'}
            startDecorator={<GlobeIcon />}>
            Browse
          </Typography>
        </StyledNavElement>
      </Box>
    </Box>
  );
}
