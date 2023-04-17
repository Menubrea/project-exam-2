import { CssBaseline, Typography, Container } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';

function App() {
  return (
    <CssVarsProvider defaultMode='system' theme={theme}>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Typography
          fontFamily={'amatic-sc, sans-serif'}
          textAlign={'center'}
          level='h1'>
          Hello World
        </Typography>
        <Typography textAlign={'center'} level='body1'>
          This is an example paragraph
        </Typography>
      </Container>
    </CssVarsProvider>
  );
}

export default App;
