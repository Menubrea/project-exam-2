import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Slider, Button } from '@mui/joy';
import {
  MainThemeButton,
  MainThemeSelect,
  StyledOption,
  StyledSlider,
} from '../../styles/GlobalStyles';

export default function Filters({
  venues,
  setFiltered,
  search,
  filtered,
  setSearch,
}) {
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

  const ResetFilters = () => {
    setGuests(1);
    setRegion('All');
    setValue([lowestPrice, highestPrice]);
    setFiltered(venues);
    setSearch('');
    const search = document.getElementById('search-input');
    search.value = '';
  };

  useEffect(() => {
    const storedGuests = sessionStorage.getItem('guests');
    const storedRegion = sessionStorage.getItem('region');
    const lowestPrice = sessionStorage.getItem('lowestPrice');
    const highestPrice = sessionStorage.getItem('highestPrice');

    if (storedGuests && storedRegion && lowestPrice && highestPrice) {
      setGuests(JSON.parse(storedGuests));
      setRegion(storedRegion);
      setValue([JSON.parse(lowestPrice), JSON.parse(highestPrice)]);
      setRegion(storedRegion || 'All');
    }
  }, []);

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
    sessionStorage.setItem('guests', guests);
    sessionStorage.setItem('region', region);
    sessionStorage.setItem('lowestPrice', JSON.stringify(value[0]));
    sessionStorage.setItem('highestPrice', JSON.stringify(value[1]));
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
          paddingY: { xs: 2 },
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: { xs: 1, sm: 2 },
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            padding: 1,
            paddingX: 2,
            backgroundColor: 'rgba(0, 0, 0, .05)',
            borderRadius: 5,
          }}>
          <Typography htmlFor='pickGuests' component={'label'}>
            Guests
          </Typography>
          <MainThemeSelect
            value={guests}
            id='pickGuests'
            variant='solid'
            color='primary'
            size='sm'
            placeholder='How many guests?'>
            <StyledOption value={'Any'} onClick={() => setGuests(1)}>
              Any
            </StyledOption>
            {sortedGuests.map((guest) => (
              <StyledOption
                key={guest}
                value={guest}
                onClick={() => setGuests(guest)}>
                {guest}
              </StyledOption>
            ))}
          </MainThemeSelect>
        </Box>
        <Box
          sx={{
            paddingX: 3,
            paddingY: 1,
            backgroundColor: 'rgba(0, 0, 0, .05)',
            borderRadius: 5,
          }}>
          <Typography
            htmlFor='priceRange'
            textAlign={'center'}
            component={'label'}>
            Price range:
          </Typography>
          <StyledSlider
            id='priceRange'
            variant='solid'
            size='md'
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
        <Box
          sx={{
            padding: 1,
            paddingX: 2,
            backgroundColor: 'rgba(0, 0, 0, .05)',
            borderRadius: 5,
          }}>
          <Typography htmlFor='setRegion' component={'label'}>
            Region
          </Typography>
          <MainThemeSelect
            value={region}
            id='setRegion'
            size='sm'
            placeholder='Choose County'>
            <StyledOption value={'All'} onClick={() => setRegion('All')}>
              All
            </StyledOption>
            {regionArray.map((region) => (
              <StyledOption
                id={`region-${region}`}
                key={region}
                value={region}
                onClick={() => setRegion(region)}>
                {region}{' '}
              </StyledOption>
            ))}
          </MainThemeSelect>
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
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
          <Typography
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: '0.2em .5em',
              borderRadius: '5px 5px 0 0',
            }}>
            {filtered.length} results found.
          </Typography>
          <MainThemeButton size='sm' onClick={ResetFilters}>
            Reset Filters
          </MainThemeButton>
        </Box>
      </Box>
    </>
  );
}
