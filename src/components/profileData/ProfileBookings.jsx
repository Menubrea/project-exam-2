import { VenueBookingCard } from '../cards';
import { Box, styled } from '@mui/joy';
import { useEffect, useState } from 'react';

const BookingsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(2),
}));

export default function ProfileBookings({ profile }) {
  const [profileBookings, setProfileBookings] = useState([]);

  useEffect(() => {
    let date = new Date();
    // Filter out expired bookings
    if (Array.isArray(profile.bookings)) {
      const profileBookings = profile.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateFrom);
        return bookingDate >= date;
      });
      // Sort from earliest to latest
      profileBookings.sort(
        (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
      );
      return setProfileBookings(profileBookings);
    }
  }, [profile.bookings]);

  return (
    <BookingsContainer>
      {Array.isArray(profileBookings) &&
        profileBookings.length > 0 &&
        profileBookings.map((booking) => (
          <VenueBookingCard key={booking.id} bookings={booking} />
        ))}
    </BookingsContainer>
  );
}
