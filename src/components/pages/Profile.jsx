import { Box, Container, Typography, styled } from '@mui/joy';
import { useState, useEffect } from 'react';
import { ProfileMeta } from '../profileData';
import { VenueBookingCard } from '../cards';

const profileUrl = 'https://api.noroff.dev/api/v1/holidaze';
const action = '/profiles/';
const flags = '?_bookings=true&_venues=true';
const venueFlags = '/venues?_bookings=true';

const BookingsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(2),
}));

export default function Profile() {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profileBookings, setProfileBookings] = useState([]);
  const [profileVenues, setProfileVenues] = useState([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    const storedToken = localStorage.getItem('token');

    if (storedProfile && storedToken) {
      setProfile(JSON.parse(storedProfile));
      setToken(JSON.parse(storedToken));
      setLoading(false);
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

  useEffect(() => {
    let date = new Date();
    if (Array.isArray(profile.bookings)) {
      const profileBookings = profile.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateFrom);
        return bookingDate > date;
      });
      setProfileBookings(profileBookings);
    }
  }, [profile.bookings]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong, please try again</p>;

  if (profile) {
    return (
      <Box>
        <ProfileMeta profile={profile} venues={profileVenues} />

        <Container sx={{ marginTop: 2 }}>
          <Typography level='h6'>Upcoming Bookings:</Typography>
          <BookingsContainer>
            {Array.isArray(profileBookings) &&
              profileBookings.length > 0 &&
              profileBookings.map((booking) => (
                <VenueBookingCard key={booking.id} bookings={booking} />
              ))}
          </BookingsContainer>
        </Container>
      </Box>
    );
  }
}
