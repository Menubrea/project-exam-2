import { Typography, Box, styled } from '@mui/joy';
import { Link } from 'react-router-dom';

const StyledNavElement = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: theme.spacing(0.5, 1),
  overflow: 'hidden',
  zIndex: 100,

  ':before': {
    content: '""',
    position: 'absolute',
    bottom: 2,
    width: '100%',
    height: '3px',
    background: `linear-gradient(180deg, ${theme.palette.primary[300]}, ${theme.palette.primary[400]})`,
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
        }}>
        <StyledNavElement to='/'>
          <Typography margin={'0 auto'} width={'fit-content'}>
            Home
          </Typography>
        </StyledNavElement>

        <StyledNavElement to='/browse'>
          <Typography margin={'0 auto'} width={'fit-content'}>
            Browse
          </Typography>
        </StyledNavElement>
      </Box>
    </Box>
  );
}
