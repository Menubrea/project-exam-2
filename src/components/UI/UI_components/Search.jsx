import {
  LinkWrapper,
  MainThemeInput,
  MainThemeButton,
} from '../../../styles/GlobalStyles';
import { Box, Typography, Slider } from '@mui/joy';
import { useEffect, useState } from 'react';

export default function Search({ venues }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setAnchorEl(document.getElementById('search-input'));
  }, [open]);

  useEffect(() => {
    if (anchorEl) {
      anchorEl.focus();
    }
  }, [anchorEl]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenSearch = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  useEffect(() => {
    const filteredVenues = venues.filter((venue) => {
      if (
        venue.name.toLowerCase().startsWith(search.toLowerCase()) &&
        search.length > 0
      ) {
        return true;
      }
      return false;
    });
    setFiltered(filteredVenues);
  }, [search, venues]);

  return (
    <>
      <MainThemeButton size='sm' onClick={handleOpenSearch}>
        Search
      </MainThemeButton>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: '#576a6b',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '4.5em',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
            width: 'clamp(200px, 100%, 1160px)',
          }}>
          <Box sx={{ width: 'fit-content', margin: '0 auto', marginTop: 2 }}>
            <MainThemeInput
              id='search-input'
              onChange={handleChange}
              size='sm'
              placeholder={'Search'}
              sx={{
                paddingX: 2,
                width: '100%',
                minWidth: '300px',
                maxWidth: '600px',
                borderRadius: '100px',
              }}
            />
          </Box>
          <Filters venues={venues} setFiltered={setFiltered} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              borderBottom: '1px solid white',
            }}>
            <Typography>Searching: {search}</Typography>{' '}
            <Typography>Total: {filtered.length}</Typography>
          </Box>
          <Box sx={{ padding: '1em', maxHeight: '400px', overflowY: 'auto' }}>
            {filtered.length > 0 ? (
              filtered.map((venue) => (
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
          <MainThemeButton
            sx={{ borderRadius: 0 }}
            fullWidth
            onClick={handleClose}>
            Close
          </MainThemeButton>
        </Box>
      )}
    </>
  );
}

const Filters = ({ venues, setFiltered }) => {
  const [guests, setGuests] = useState(0);
  const [value, setValue] = useState([0, 0]);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1);

  useEffect(() => {
    if (venues) {
      const sortedVenues = venues.sort((a, b) => a.price - b.price);
      if (sortedVenues) {
        const lowestPrice = sortedVenues[0].price;
        const highestPrice = sortedVenues[sortedVenues.length - 1].price;
        setLowestPrice(lowestPrice);
        setHighestPrice(highestPrice);
        setValue([lowestPrice, highestPrice]);
      }
    }
  }, [venues]);

  useEffect(() => {
    const filteredVenues = venues.filter((venue) => {
      if (
        venue.maxGuests >= guests &&
        venue.price >= value[0] &&
        venue.price <= value[1]
      ) {
        return true;
      }
      return false;
    });
    setFiltered(filteredVenues);
  }, [guests, venues, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valueText(value) {
    return `${value},-`;
  }

  return (
    <Box sx={{ width: 'fit-content', margin: '.5em auto' }}>
      <Typography>Guests</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <MainThemeButton onClick={() => setGuests(1)}>1</MainThemeButton>
        <MainThemeButton onClick={() => setGuests(2)}>2</MainThemeButton>
        <MainThemeButton onClick={() => setGuests(3)}>3</MainThemeButton>
        <MainThemeButton onClick={() => setGuests(4)}>4</MainThemeButton>
        <MainThemeButton onClick={() => setGuests(5)}>5</MainThemeButton>
        <MainThemeButton onClick={() => setGuests(6)}>6+</MainThemeButton>
      </Box>
      <Box>
        <Typography>Price range:</Typography>
        <Slider
          getAriaLabel={() => 'Price Range'}
          value={value}
          onChange={handleChange}
          getAriaValueText={valueText}
          valueLabelDisplay='on'
          step={100}
          marks={[
            { value: lowestPrice, label: `${lowestPrice},-` },
            { value: highestPrice, label: `${highestPrice},-` },
          ]}
          min={lowestPrice}
          max={highestPrice}
        />
      </Box>
    </Box>
  );
};
