import { Box, Container, Typography, styled } from '@mui/joy';
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
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`

  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledMain = styled(Box)(({ theme }) => ({
  paddingTop: '75px',
  minHeight: 'calc(110vh - 75px)',
  paddingBottom: 6,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[700]
      : theme.palette.neutral[200],
  animation: `${fadeIn} 1s ease-in-out`,
}));

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
    setTimeout(() => {
      if (container && overlay && slideIn) {
        container.style.transform = 'translateX(0)';
        container.style.transition = 'transform 0.5s ease-in-out';
        overlay.style.transform = 'translateX(0)';
        overlay.style.transition = 'opacity 0.5s ease-in-out';
        overlay.style.opacity = 1;
      }
    }, 10);

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
      <StyledMain component={'main'}>
        <AppMeta
          title={`Holidaze | ${profileData.name} profile`}
          description='View your Holidaze profile, edit your details, view your bookings and venues.'
          tags='rent, venue, online, place to rent, holidaze.com, vacation, booking, profile, edit, bookings, venues'
        />

        <BreadCrumbsNav profile={profileData} />

        <Container
          sx={{
            display: { xs: 'block' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 2,
            gap: 2,
          }}>
          <ProfileDetails
            profile={profileData}
            handleCreateSlide={handleCreateSlide}
          />

          {profile.venueManager &&
            profileVenues &&
            profileVenues.length > 0 && (
              <ProfileVenueList
                key={venueUpdates}
                venues={profileVenues}
                handleBookingsSlideIn={handleBookingsSlideIn}
              />
            )}
        </Container>

        {profileData.bookings && profileData.bookings.length > 0 && (
          <Container sx={{ marginY: 2 }}>
            <ProfileBookings profile={profileData} />
          </Container>
        )}

        <ProfileVenueBookings
          profile={profile}
          venue={selectedVenue}
          token={token}
          setCreateVenue={setCreateVenue}
          setFilteredVenues={setFilteredVenues}
          setProfileVenues={setProfileVenues}
          createVenue={createVenue}
          profileVenues={profileVenues}
        />
      </StyledMain>
    );
  }
}
