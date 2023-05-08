import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI';
import { Home, Venue, Profile, Venues } from './components/pages/';
import { useApi } from './api/useApi';
import { HandleStorageListener } from './handlers';
import { useEffect, useState } from 'react';

const venueUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/venues';
const flags = '?_bookings=true&_owner=true';

const profileUrl = 'https://api.noroff.dev/api/v1/holidaze';
const profileAction = '/profiles/';
const profileFlags = '?_bookings=true&_venues=true';

function App() {
  // const { token, profile } = HandleStorageListener();
  // const options = { headers: { Authorization: `Bearer ${token}` } };
  const { data, error, loading } = useApi(venueUrl + action + flags);

  // const { data: profileData } = useApi(
  //   profileUrl + profileAction + profile.name + profileFlags,
  //   options
  // );

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;

  // const filteredVenues = data.filter((venue) => {
  //   if (venue.location.country === 'Norway') {
  //     return true;
  //   }
  // });

  if (data) {
    return (
      <CssVarsProvider defaultMode='system' theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Layout venues={data} />}>
            <Route
              index
              element={<Home data={data} error={error} loading={loading} />}
            />
            <Route path='/profile' element={<Profile />} />
            <Route
              path='/venue/:id'
              element={<Venue venue={data} loading={loading} error={error} />}
            />
            <Route path='/venues' element={<Venues venues={data} />} />
          </Route>
        </Routes>
      </CssVarsProvider>
    );
  }
}

export default App;
