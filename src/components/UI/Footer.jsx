import { Box, Typography, styled } from '@mui/joy';
import Twitter from '@mui/icons-material/Twitter';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import Github from '@mui/icons-material/GitHub';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
 0% {
  opacity: 0;
  
}
 50% {
  opacity: 0;
 }
  100% {
    opacity: 1;
  }
`;

const StyledIconContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  marginY: 1,
  ' svg': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary[700]
        : theme.palette.neutral[50],
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.neutral[50]
        : theme.palette.primary[700],
    border:
      theme.palette.mode === 'dark'
        ? `1px solid ${theme.palette.neutral[50]}`
        : `1px solid ${theme.palette.primary[700]}`,
    borderRadius: '100vw',
    fontSize: '2.2rem',
    padding: '5px',
  },
  'svg + svg': {
    marginLeft: '.5em',
  },
}));

/**
 * A footer with social media links
 * @returns {JSX.Element}
 */
export function Footer() {
  return (
    <Box
      sx={{
        paddingTop: 4,
        paddingBottom: { xs: '75px', sm: 4 },
        animation: `${fadeIn} 3s ease-in-out`,
      }}
      component={'footer'}>
      <StyledIconContainer>
        <Twitter /> <Facebook /> <Instagram /> <Github />
      </StyledIconContainer>
      <Typography marginTop={2} level='body1' textAlign={'center'}>
        Menubrea | All Rights Reserved &copy;
      </Typography>
    </Box>
  );
}
