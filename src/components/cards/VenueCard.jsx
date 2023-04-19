import { Box, Typography } from '@mui/joy';

const altImage =
  'https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80';

export function VenueCard({ venue }) {
  return (
    <Box sx={{ height: 100, backgroundColor: 'red' }}>
      <Typography>{venue.name}</Typography>
      <Typography>{venue.description}</Typography>
    </Box>
  );
}
