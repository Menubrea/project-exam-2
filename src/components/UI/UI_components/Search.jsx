import { LinkWrapper, MainThemeInput } from '../../../styles/GlobalStyles';
import { Box, Typography, Container, Button } from '@mui/joy';
import { useState } from 'react';

export default function Search({ venues }) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    console.log('close');
    setSearch('');
  };

  const filteredVenues = venues.filter((venue) => {
    if (
      venue.name.toLowerCase().startsWith(search.toLowerCase()) &&
      search.length > 0
    ) {
      return true;
    }
    return false;
  });

  return (
    <>
      <MainThemeInput
        onChange={handleChange}
        size='sm'
        placeholder={'Search'}
        sx={{
          paddingX: 1,
          minWidth: '200px',
          maxWidth: '350px',
        }}
      />
      {search.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            backgroundColor: '#576a6b',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '4.5em',
            maxHeight: '500px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
            overflowY: 'auto',
            width: 'clamp(200px, 100%, 1160px)',
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid white',
            }}>
            <Typography>Searching: {search}</Typography>{' '}
            <Typography>Total: {filteredVenues.length}</Typography>
          </Box>
          <Box sx={{ padding: '1em' }}>
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <LinkWrapper
                  key={venue.id}
                  to={`/venue/${venue.id}`}
                  onClick={handleClose}>
                  <Box>{venue.name}</Box>
                </LinkWrapper>
              ))
            ) : (
              <Box sx={{ textAlign: 'center' }}>No Results found.</Box>
            )}
          </Box>
          <Button sx={{ borderRadius: 0 }} fullWidth onClick={handleClose}>
            Close
          </Button>
        </Box>
      )}
    </>
  );
}
