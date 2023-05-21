import { Logo } from './UI_components';
import { Container, Box, styled } from '@mui/joy';
import { MainMenu, ChangeTheme } from './UI_components';
import { Navigation } from './Nav';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  zIndex: 100,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[500]
      : theme.palette.neutral[100],
  boxShadow: '0 0 10px 5px rgba(0, 0, 0, .2)',
  borderBottom:
    theme.palette.mode === 'dark'
      ? `4px solid ${theme.palette.primary[700]}`
      : `4px solid ${theme.palette.neutral[200]}`,
}));

export function Header() {
  return (
    <StyledBox component={'header'}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: { xs: 2, md: 2, lg: 0 },
          alignItems: 'center',
          height: 50,
          overflow: 'hidden',
        }}>
        <Box
          sx={{
            display: 'flex',
            gap: { sm: 2, alignItems: 'center' },
          }}>
          <Logo />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Navigation />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ChangeTheme />

          <MainMenu />
        </Box>
      </Container>
    </StyledBox>
  );
}
