import { useEffect, useState } from 'react';
import { Box, Typography, Slider, Select, Option } from '@mui/joy';

export default function Filters({ venues, setFiltered, search, filtered }) {
  const [guests, setGuests] = useState(1);
  const [value, setValue] = useState([0, 0]);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(1);
  const [region, setRegion] = useState('All');

  const regionSet = new Set(venues.map((venue) => venue.location.city));
  const guestSet = new Set(venues.map((venue) => venue.maxGuests));
  const guestsArray = [...guestSet];
  const sortedGuests = guestsArray.sort((a, b) => a - b);
  const regionArray = [...regionSet];

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
        venue.price <= value[1] &&
        (venue.location.city === region || region === 'All') &&
        venue.name.toLowerCase().startsWith(search.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setFiltered(filteredVenues);
  }, [guests, venues, value, region, search]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valueText(value) {
    return `${value},-`;
  }

  return (
    <>
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: { xs: 0, sm: 4 },
          justifyContent: 'space-between',
        }}>
        <Box>
          <Typography>Guests</Typography>
          <Select
            variant='solid'
            color='primary'
            size='sm'
            placeholder='How many guests?'>
            <Option value={'Any'} onClick={() => setGuests(1)}>
              Any
            </Option>
            {sortedGuests.map((guest) => (
              <Option
                key={guest}
                value={guest}
                onClick={() => setGuests(guest)}>
                {guest}
              </Option>
            ))}
          </Select>
        </Box>
        <Box>
          <Typography textAlign={'center'}>Price range:</Typography>
          <Slider
            variant='solid'
            color='primary'
            size='sm'
            value={value}
            onChange={handleChange}
            getAriaValueText={valueText}
            valueLabelDisplay='on'
            x
            step={100}
            marks={[
              { value: lowestPrice, label: `${lowestPrice},-` },
              { value: highestPrice, label: `${highestPrice},-` },
            ]}
            min={lowestPrice}
            max={highestPrice}
          />
        </Box>
        <Box>
          <Typography>County</Typography>
          <Select
            variant='solid'
            color='primary'
            size='sm'
            placeholder='Choose County'>
            <Option value={'All'} onClick={() => setRegion('All')}>
              All
            </Option>
            {regionArray.map((region) => (
              <Option
                key={region}
                value={region}
                onClick={() => setRegion(region)}>
                {region}{' '}
              </Option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexWrap: 'wrap',
            gap: 1,
            width: 'fit-content',
          }}>
          <Typography
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: '0.2em .5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Price range: {value[0]} kr - {value[1]} kr
          </Typography>
          <Typography
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: '0.2em .5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Region: {region}
          </Typography>
          <Typography
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: '0.2em .5em',
              borderRadius: '5px 5px 0 0',
            }}>
            Min guest(s): {guests}
          </Typography>
          {search && (
            <Typography
              sx={{
                backgroundColor: 'rgba(0, 0, 0, .1)',
                padding: '0.2em .5em',
                borderRadius: '5px 5px 0 0',
              }}>
              Searching: {search}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 'fit-content',
            margin: { xs: '0 auto', md: '0 0 0 auto' },
          }}>
          <Typography level='body1'>
            {filtered.length} results found for your search.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
