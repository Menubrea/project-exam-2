import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI';
import { Home, Venue, Profile } from './components/pages/';
import { useApi } from './api/useApi';

const venueUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/venues';

function App() {
  const { data, error, loading } = useApi(venueUrl + action);

  return (
    <CssVarsProvider defaultMode='system' theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home data={data} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/venue/:id' element={<Venue venue={data} />} />
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
