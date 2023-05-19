import { Box, Container, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';
import {
  ProfileBookings,
  ProfileMeta,
  ProfileVenueBookings,
} from '../profileData';
import ProfileVenues from '../profileData/ProfileVenues.jsx';

const profileUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/profiles/';
const flags = '?_bookings=true&_venues=true';
const venueFlags = '/venues?_bookings=true';

export default function Profile({ setFilteredVenues }) {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profileVenues, setProfileVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [slideIn, setSlideIn] = useState(false);
  const [createVenue, setCreateVenue] = useState(false);
  const [venueUpdates, setVenueUpdates] = useState(0);

  useEffect(() => {
    const container = document.getElementById('bookingsContainer');
    const overlay = document.getElementById('overlay');
    if (container && overlay) {
      container.style.transform = 'translateX(0)';
      container.style.transition = 'transform 0.5s ease-in-out';
      overlay.style.transform = 'translateX(0)';
    }

    return () => {
      container && (container.style.transform = null);
      container && (container.style.transition = null);
      overlay && (overlay.style.transform = null);
      overlay && (overlay.style.transition = null);
      setSlideIn(false);
    };
  }, [selectedVenue, slideIn]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const storedToken = localStorage.getItem('token');

    if (storedProfile && storedToken) {
      setProfile(JSON.parse(storedProfile));
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const handleCreateSlide = () => {
    setSlideIn(true);
    setCreateVenue(true);
  };

  useEffect(() => {
    setVenueUpdates((prev) => prev + 1);
  }, [profileVenues, setProfileVenues]);

  const handleBookingsSlideIn = (e) => {
    const button = e.target.closest('div[id]');
    const buttonId = button && button.getAttribute('id');
    const venueId = e.target.id;
    const venue = profileVenues.find(
      (venue) => venue.id === venueId || venue.id === buttonId
    );

    if (venue) {
      setSelectedVenue(venue);
      setSlideIn(true);
    }
  };

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
  }, [token, profile.name]);

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
          const myVenues = await response.json();
          setProfileVenues(myVenues);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Something went wrong, please try again</p>;

  if (profile) {
    return (
      <Box component={'main'}>
        <ProfileMeta profile={profile} handleCreateSlide={handleCreateSlide} />

        <ProfileVenueBookings
          profile={profile}
          venue={selectedVenue}
          token={token}
          setCreateVenue={setCreateVenue}
          setFilteredVenues={setFilteredVenues}
          setProfileVenues={setProfileVenues}
          createVenue={createVenue}
          setSlideIn={setSlideIn}
          profileVenues={profileVenues}
        />

        {profile.venueManager && profileVenues && profileVenues.length > 0 && (
          <ProfileVenues
            key={venueUpdates}
            venues={profileVenues}
            handleBookingsSlideIn={handleBookingsSlideIn}
          />
        )}

        {profile.bookings && profile.bookings.length > 0 && (
          <Container sx={{ marginTop: 2 }}>
            <Typography level='h6' component={'h2'}>
              Upcoming Bookings:
            </Typography>
            <ProfileBookings profile={profile} />
          </Container>
        )}
      </Box>
    );
  }
}
