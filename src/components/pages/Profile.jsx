import { Box, Container, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';
import {
  ProfileBookings,
  ProfileDetails,
  ProfileVenueBookings,
  ProfileVenueList,
} from '../profileData';
import AppMeta from '../AppMeta';
import { BreadCrumbsNav } from '../UI';
import { Loading } from '../';
import { ErrorComponent } from '../';
import { StoredProfile } from '../hooks';
import { FetchProfile } from '../../api/profile';

export default function Profile({ setFilteredVenues }) {
  const { token, profile } = StoredProfile();
  const {
    profileData,
    profileVenues: myProfileVenues,
    error,
    loading,
  } = FetchProfile();
  const [profileVenues, setProfileVenues] = useState({});
  const [slideIn, setSlideIn] = useState(false);
  const [createVenue, setCreateVenue] = useState(false);
  const [venueUpdates, setVenueUpdates] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState({});

  useEffect(() => {
    setProfileVenues(myProfileVenues);
  }, [myProfileVenues]);

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

  const handleCreateSlide = () => {
    setSlideIn(true);
    setCreateVenue(true);
  };

  useEffect(() => {
    setVenueUpdates((prev) => prev + 1);
  }, [profileVenues]);

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

  if (error) return <ErrorComponent />;
  if (loading) return <Loading />;

  if (profile) {
    return (
      <Box
        sx={{
          paddingTop: '54px', // height of header
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primary[700]
              : theme.palette.neutral[200],
        }}
        component={'main'}>
        <AppMeta
          title={`Holidaze | ${profileData.name} profile`}
          description='View your Holidaze profile, edit your details, view your bookings and venues.'
          tags='rent, venue, online, place to rent, holidaze.com, vacation, booking, profile, edit, bookings, venues'
        />

        <BreadCrumbsNav profile={profileData} />

        <ProfileDetails
          profile={profileData}
          handleCreateSlide={handleCreateSlide}
        />

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
          <ProfileVenueList
            key={venueUpdates}
            venues={profileVenues}
            handleBookingsSlideIn={handleBookingsSlideIn}
          />
        )}

        {profileData.bookings && profileData.bookings.length > 0 && (
          <Container sx={{ marginTop: 2 }}>
            <Typography
              sx={{ fontWeight: 900, marginBottom: 0.5 }}
              component={'h2'}>
              Upcoming Bookings:
            </Typography>
            <ProfileBookings profile={profileData} />
          </Container>
        )}
      </Box>
    );
  }
}
