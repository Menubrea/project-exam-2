import { VenueBookingCard } from '../cards';
import { Box, styled, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';

const BookingsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
  gap: theme.spacing(2),
}));

/**
 * Component for displaying bookings of a user
 * @param {object} profile - profile object
 * @returns {JSX.Element}
 */
export default function ProfileBookings({ profile }) {
  const [profileBookings, setProfileBookings] = useState([]);

  useEffect(() => {
    let date = new Date();
    if (Array.isArray(profile.bookings)) {
      const profileBookings = profile.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateFrom);
        return bookingDate >= date;
      });

      profileBookings.sort(
        (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
      );
      return setProfileBookings(profileBookings);
    }
  }, [profile.bookings]);

  if (profileBookings) {
    return (
      <>
        <Typography sx={{ marginBottom: 0.5 }} component={'h2'}>
          You have {profileBookings.length} booking(s)
        </Typography>
        <BookingsContainer>
          {Array.isArray(profileBookings) &&
            profileBookings.length > 0 &&
            profileBookings.map((booking) => (
              <VenueBookingCard key={booking.id} bookings={booking} />
            ))}
        </BookingsContainer>
      </>
    );
  }
}
