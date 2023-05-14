import { Box, Container, Typography, styled } from '@mui/joy';
import { useState, useEffect } from 'react';
import { ProfileBookings, ProfileMeta, ProfileVenues } from '../profileData';
import { EditVenueModal } from '../modals';

const profileUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/profiles/';
const flags = '?_bookings=true&_venues=true';
const venueFlags = '/venues?_bookings=true';

export default function Profile() {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profileVenues, setProfileVenues] = useState([]);
  const [venueById, setVenueById] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    const button = e.target.closest('button[id]');
    const buttonId = button && button.getAttribute('id');
    const venueId = e.target.id;
    const venue = profileVenues.find(
      (venue) => venue.id === venueId || venue.id === buttonId
    );

    if (venue) {
      setOpen(true);
      setVenueById(venue);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const storedToken = localStorage.getItem('token');

    if (storedProfile && storedToken) {
      setProfile(JSON.parse(storedProfile));
      setToken(JSON.parse(storedToken));
    }
  }, []);

  useEffect(() => {
    if (token && profile.name) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await fetch(
            profileUrl + action + profile.name + flags,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          setProfile(result);
        } catch (error) {
          setError(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [token]);

  useEffect(() => {
    if (token && profile.name) {
      const fetchProfileVenues = async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await fetch(
            profileUrl + action + profile.name + venueFlags,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          setProfileVenues(result);
        } catch (error) {
          setError(true);
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfileVenues();
    }
  }, [token]);

  if (loading)
    return (
      <Box sx={{ height: '100vh', width: '100vw', backgroundColor: 'red' }}>
        Loading...
      </Box>
    );
  if (error) return <p>Something went wrong, please try again</p>;

  if (profile) {
    return (
      <Box component={'main'}>
        <ProfileMeta profile={profile} />

        {profile.venueManager && profileVenues.length > 0 && (
          <ProfileVenues venues={profileVenues} handleOpen={handleOpen} />
        )}

        {profile.bookings && profile.bookings.length > 0 && (
          <Container sx={{ marginTop: 2 }}>
            <Typography level='h6' component={'h2'}>
              Upcoming Bookings:
            </Typography>
            <ProfileBookings profile={profile} />
          </Container>
        )}
        <EditVenueModal
          venue={venueById}
          open={open}
          handleClose={handleClose}
        />
      </Box>
    );
  }
}
