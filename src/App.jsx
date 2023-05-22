import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI';
import { Home, Venue, Profile, Browse } from './components/pages/';
import { getAllVenues } from './api/getAllVenues';
import { useState, useEffect } from 'react';
import ErrorComponent from './components/Error';

const venueUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/venues';
const flags = '?_bookings=true&_owner=true';

function App() {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const { data, error, loading } = getAllVenues(venueUrl + action + flags);

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

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <CssVarsProvider defaultMode='system' theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path='/'
          element={
            <Layout venues={filteredVenues} loading={loading} error={error} />
          }>
          <Route index element={<Home data={filteredVenues} />} />
          <Route
            path='/profile'
            element={<Profile setFilteredVenues={setFilteredVenues} />}
          />
          <Route
            path='/venue/:id'
            element={
              <Venue venue={filteredVenues} loading={loading} error={error} />
            }
          />
          <Route path='/browse' element={<Browse venues={filteredVenues} />} />
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
