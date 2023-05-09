import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI';
import { Home, Venue, Profile, Venues } from './components/pages/';
import { useApi } from './api/useApi';

const venueUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/venues';
const flags = '?_bookings=true&_owner=true';

function App() {
  const { data, error, loading } = useApi(venueUrl + action + flags);
  console.log(data);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;

  const filteredVenues = data.filter((venue) => {
    if (venue.owner.name === 'Easy_Living') {
      return true;
    }
  });

  if (data) {
    return (
      <CssVarsProvider defaultMode='system' theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Layout venues={filteredVenues} />}>
            <Route
              index
              element={
                <Home data={filteredVenues} error={error} loading={loading} />
              }
            />
            <Route path='/profile' element={<Profile />} />
            <Route
              path='/venue/:id'
              element={
                <Venue venue={filteredVenues} loading={loading} error={error} />
              }
            />
            <Route
              path='/venues'
              element={<Venues venues={filteredVenues} />}
            />
          </Route>
        </Routes>
      </CssVarsProvider>
    );
  }
}

export default App;
