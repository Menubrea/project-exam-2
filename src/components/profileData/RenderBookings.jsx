import { useState, useEffect } from 'react';
import { Box, Tooltip, Typography } from '@mui/joy';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function RenderBookings({ profileVenues }) {
  const [profileBookings, setProfileBookings] = useState([]);

  useEffect(() => {
    let date = new Date();
    if (Array.isArray(profileVenues.bookings)) {
      const profileBookings = profileVenues.bookings.filter((booking) => {
        const bookingDate = new Date(booking.dateFrom);
        return bookingDate >= date;
      });
      profileBookings.sort(
        (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
      );
      return setProfileBookings(profileBookings);
    }
  }, [profileVenues.bookings]);

  const months = profileBookings.reduce((acc, booking) => {
    const date = new Date(booking.dateFrom);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;
    const monthYearIndex = acc.findIndex(
      (month) => month.monthYear === monthYear
    );
    if (monthYearIndex === -1) {
      acc.push({ monthYear, bookings: [booking] });
    } else {
      acc[monthYearIndex].bookings.push(booking);
    }
    return acc;
  }, []);

  const formatDate = (date) => {
    let formatDate = new Date(date).toLocaleDateString('en-UK', {
      month: 'short',
      day: 'numeric',
    });
    return formatDate;
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {profileVenues.bookings && (
        <Box>
          {months.map((month) => (
            <Box
              key={month.monthYear}
              component={'ul'}
              sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <Typography level='h6' component={'h2'} sx={{ marginY: 2 }}>
                {month.monthYear}
              </Typography>
              {month.bookings.map((booking) => (
                <Box
                  component={'li'}
                  key={booking.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 0.5,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.primary[700]
                        : theme.palette.neutral[100],
                    borderRadius: 3,
                    marginBottom: 1,
                    gap: 0.5,
                  }}>
                  <Box
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary[500]
                          : theme.palette.neutral[200],
                      padding: 1,
                      borderRadius: 3,
                      width: 60,
                    }}>
                    <Box>
                      <Typography>Guests</Typography>
                      <Typography
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                        }}>
                        {' '}
                        <GroupsIcon aria-label='Number of guests' />
                        {booking.guests}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      width: 300,
                      justifyContent: 'space-between',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? theme.palette.primary[500]
                          : theme.palette.neutral[50],
                      padding: 1,
                      borderRadius: 3,
                    }}>
                    <Box>
                      <Typography textAlign={'center'}>From:</Typography>
                      <Typography
                        textAlign={'left'}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon />
                        {formatDate(booking.dateFrom)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography textAlign={'center'}>To:</Typography>
                      <Typography
                        textAlign={'right'}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon />
                        {formatDate(booking.dateTo)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
      {profileVenues.bookings && profileVenues.bookings.length === 0 && (
        <Typography
          level='h6'
          component={'p'}
          sx={{ padding: 2, textAlign: 'center' }}>
          No bookings have been made yet.
        </Typography>
      )}
    </Box>
  );
}
