import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI';
import { Home, Venue, Profile } from './components/pages/';
import { useApi } from './api/useApi';
import { useState, useEffect } from 'react';

const venueUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/venues';
const flags = '?_bookings=true&_owner=true';

function App() {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const { data, error, loading } = useApi(venueUrl + action + flags);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((venue) => {
        if (venue.owner.name === 'Easy_Living') {
          return true;
        }
      });
      setFilteredVenues(filtered);
    }
  }, [data]);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;

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
          </Route>
        </Routes>
      </CssVarsProvider>
    );
  }
}

export default App;
