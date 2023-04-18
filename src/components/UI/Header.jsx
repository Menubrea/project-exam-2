import { Search } from './UI_components/Search';
import { Logo } from '../Logo';
import { Container, Box } from '@mui/joy';
import { MainMenu } from './UI_components/MainMenu';
import { ChangeTheme } from './UI_components/ChangeTheme';

export function Header() {
  return (
    <Container
      component={'header'}
      maxWidth='lg'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingY: 2,
        marginTop: 2,
        alignItems: 'center',
      }}>
      <Logo />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <ChangeTheme />
        <Search />
        <MainMenu />
      </Box>
    </Container>
  );
}
